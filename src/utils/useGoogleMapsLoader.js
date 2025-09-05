import { useEffect, useState } from 'react';

export function useGoogleMapsLoader(apiKey) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!apiKey) {
      console.error("Google Maps API key is required");
      return;
    }

    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => setLoaded(true));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => setLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Google Maps script");
      setLoaded(false);
    };

    document.body.appendChild(script);

    return () => {
      if (script) {
        script.removeEventListener('load', () => setLoaded(true));
      }
    };
  }, [apiKey]);

  return loaded;
}
