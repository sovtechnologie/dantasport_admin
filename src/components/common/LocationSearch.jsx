import { FiSearch } from "react-icons/fi";
import { useGoogleMapsLoader } from "../../hooks/common/useGoogleMapsLoader";
import { useGooglePlacesAutocomplete } from "../../hooks/common/useGooglePlacesAutocomplete";

const GOOGLE_API_KEY = "AIzaSyA2otw_MlUBXXfpinfgDEuJQoiqSRoYElg";

const LocationSearch = ({ onSelect }) => {
  const isLoaded = useGoogleMapsLoader(GOOGLE_API_KEY);

  const { inputRef, location } = useGooglePlacesAutocomplete({
    isLoaded,
  });

  // notify parent whenever location changes
  if (location.lat && onSelect) {
    onSelect(location);
  }

  return (
    <>
      {/* Search Input */}
      <div className="mb-3 position-relative">
        <FiSearch
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "18px",
            color: "#6c757d",
          }}
        />
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          style={{ paddingLeft: "40px" }}
          placeholder="Search location"
        />
      </div>

      {/* Map */}
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          height: "260px",
        }}
      >
        <iframe
          title="location-map"
          width="100%"
          height="100%"
          style={{ border: "0" }}
          src={
            location.mapUrl ||
            "https://www.google.com/maps?q=India&output=embed"
          }
        />
      </div>
    </>
  );
};

export default LocationSearch;
