// import { Input } from 'antd';
// import React, { useEffect, useRef, useState } from 'react';

// const GooglePlacesAutocomplete = ({ onPlaceSelect, placeholder }) => {
//   const inputRef = useRef(null);
//   const autocompleteRef = useRef(null);

//   const getAddressComponent = (components, type) => {
//     const comp = components.find(c => c.types.includes(type));
//     return comp ? comp.long_name : '';
//   };

//   useEffect(() => {
//     if (!window.google) {
//       console.error("Google Maps JS API not loaded");
//       return;
//     }

//     autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
//       componentRestrictions: { country: 'in' }, // optional
//       fields: ['formatted_address', 'geometry', 'address_component'],
//       types: ['address'],
//     });

//     autocompleteRef.current.addListener('place_changed', () => {
//       const place = autocompleteRef.current.getPlace();
//       if (!place.geometry) {
//         console.error("No geometry data for selected place");
//         return;
//       }

//       const components = place.address_components;

//       onPlaceSelect({
//         address: place.formatted_address,
//         latitude: place.geometry.location.lat(),
//         longitude: place.geometry.location.lng(),
//         area: getAddressComponent(components, 'sublocality_level_1') || getAddressComponent(components, 'sublocality') || '',
//         city: getAddressComponent(components, 'locality') || getAddressComponent(components, 'sublocality') || '',
//         state: getAddressComponent(components, 'administrative_area_level_1') || '',
//         pincode: getAddressComponent(components, 'postal_code') || '',
//       });
//     });

//     return () => {
//       if (autocompleteRef.current) {
//         window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
//       }
//     };
//   }, [onPlaceSelect]);

//   return (
//     <input
//       ref={inputRef}
//       placeholder={placeholder}
//       style={{
//         width: '100%',
//         padding: '6px 11px',
//         borderRadius: 4,
//         border: '1px solid #d9d9d9',     // add this line
//         outline: 'none',                  // remove default focus outline
//       }}
//       onFocus={e => e.target.style.borderColor = '#40a9ff'}   // optional focus style
//       onBlur={e => e.target.style.borderColor = '#d9d9d9'}
//     />

//   );
// };

// export default GooglePlacesAutocomplete;
import React, { useEffect, useRef } from 'react';
import { Input, Spin } from 'antd';
import { useGoogleMapsLoader } from '../utils/useGoogleMapsLoader';
import { parseGoogleMapsUrl } from '../utils/parseGoogleMapsUrl';

const GooglePlacesAutocomplete = ({ value, onChange, onPlaceSelect, placeholder }) => {
  const inputRef = useRef(null);          // ref to AntD Input React instance
  const autocompleteRef = useRef(null);

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const loaded = useGoogleMapsLoader(apiKey);

  const getAddressComponent = (components, type) => {
    const comp = components.find(c => c.types.includes(type));
    return comp ? comp.long_name : '';
  };

  useEffect(() => {
    if (!loaded) return;
    if (!inputRef.current || !inputRef.current.input) {
      // AntD Input or its internal input not yet assigned
      return;
    }

    if (autocompleteRef.current) {
      window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
    }

    // Pass the native input element (inputRef.current.input) to Google Autocomplete
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current.input,
      {
        componentRestrictions: { country: 'in' },
        fields: ['formatted_address', 'geometry', 'address_component'],
        types: ['address'],
      }
    );

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry) {
        console.error("No geometry data for selected place");
        return;
      }

      const components = place.address_components;

      onPlaceSelect({
        address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        area:
          getAddressComponent(components, 'sublocality_level_1') ||
          getAddressComponent(components, 'sublocality') ||
          '',
        city:
          getAddressComponent(components, 'locality') ||
          getAddressComponent(components, 'sublocality') ||
          '',
        state: getAddressComponent(components, 'administrative_area_level_1') || '',
        pincode: getAddressComponent(components, 'postal_code') || '',
      });
    });

    return () => {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [loaded, onPlaceSelect]);

  // Fetch place details by placeId or lat/lng
  const fetchPlaceDetails = async ({ placeId, lat, lng }) => {
    if (!window.google) return;
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    if (placeId) {
      service.getDetails({ placeId, fields: ['formatted_address', 'geometry', 'address_component'] }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const components = place.address_components;
          onPlaceSelect({
            address: place.formatted_address,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            area:
              getAddressComponent(components, 'sublocality_level_1') ||
              getAddressComponent(components, 'sublocality') ||
              '',
            city:
              getAddressComponent(components, 'locality') ||
              getAddressComponent(components, 'sublocality') ||
              '',
            state: getAddressComponent(components, 'administrative_area_level_1') || '',
            pincode: getAddressComponent(components, 'postal_code') || '',
          });
        }
      });
    } else if (lat && lng) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results.length) {
          const place = results[0];
          const components = place.address_components;
          onPlaceSelect({
            address: place.formatted_address,
            latitude: lat,
            longitude: lng,
            area:
              getAddressComponent(components, 'sublocality_level_1') ||
              getAddressComponent(components, 'sublocality') ||
              '',
            city:
              getAddressComponent(components, 'locality') ||
              getAddressComponent(components, 'sublocality') ||
              '',
            state: getAddressComponent(components, 'administrative_area_level_1') || '',
            pincode: getAddressComponent(components, 'postal_code') || '',
          });
        }
      });
    }
  };

  // Listen for change - check for Maps URL
  const handleInputChange = e => {
    onChange && onChange(e);
    const urlInfo = parseGoogleMapsUrl(e.target.value);
    console.log('Parsing result:', urlInfo);
    if (urlInfo && loaded) {
      fetchPlaceDetails(urlInfo);
    }
  };

  if (!loaded) return <Spin />;

  return (
    <Input
      value={value}
       onChange={handleInputChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '6px 11px',
        borderRadius: 4,
        border: '1px solid #d9d9d9',
        outline: 'none',
      }}
      onFocus={e => (e.target.style.borderColor = '#40a9ff')}
      onBlur={e => (e.target.style.borderColor = '#d9d9d9')}
      ref={inputRef}   // attach React ref here, NOT inputRef prop
    />
  );
};

export default GooglePlacesAutocomplete;
