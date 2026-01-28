import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback } from "react";

const containerStyle = {
  width: "100%",
  height: "260px",
  borderRadius: "12px",
};

const GoogleMapPicker = ({ location, onSelect }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_API_KEY",
    libraries: ["places"],
  });

  const handleClick = useCallback(
    (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          let area = "",
            city = "",
            state = "";

          results[0].address_components.forEach((c) => {
            if (c.types.includes("sublocality")) area = c.long_name;
            if (c.types.includes("locality")) city = c.long_name;
            if (c.types.includes("administrative_area_level_1"))
              state = c.long_name;
          });

          onSelect({
            latitude: lat,
            longitude: lng,
            address: results[0].formatted_address,
            area,
            city,
            state,
          });
        }
      });
    },
    [onSelect]
  );

  if (!isLoaded) return null;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: location.lat || 22.7196,
        lng: location.lng || 75.8577,
      }}
      zoom={14}
      onClick={handleClick}
    >
      {location.lat && (
        <Marker position={{ lat: location.lat, lng: location.lng }} />
      )}
    </GoogleMap>
  );
};

export default GoogleMapPicker;
