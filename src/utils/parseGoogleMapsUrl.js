// utils/parseGoogleMapsUrl.js

// export function parseGoogleMapsUrl(url) {
//     try {
//         const placeIdMatch = url.match(/place\/.*\/data=!3m1!4b1!4m.*!3d([\d.]+)!4d([\d.]+)/); // Sometimes place URL with lat/lng
//         const placeIdParam = url.match(/[?&]place_id=([A-Za-z0-9_-]+)/);
//         const latLngMatch = url.match(/@([-\d.]+),([-\d.]+)/);

//         if (placeIdParam) {
//             return { placeId: placeIdParam[1] };
//         }
//         if (latLngMatch) {
//             return { lat: parseFloat(latLngMatch), lng: parseFloat(latLngMatch) };
//         }
//         return null;
//     } catch (e) {
//         return null;
//     }
// }
// export function parseGoogleMapsUrl(url) {
//   if (!url) return null;

//   // Decode URL to handle encoded characters
//   const decodedUrl = decodeURIComponent(url);

//   // Match place_id param if exists
//   const placeIdMatch = decodedUrl.match(/[?&]place_id=([^&]+)/);
//   if (placeIdMatch) return { placeId: placeIdMatch[1] };

//   // Match !3dLAT!4dLNG pattern (Google Maps place coordinates)
//   const latLngMatch = decodedUrl.match(/!3d([-\d.]+)!4d([-\d.]+)/);
//   if (latLngMatch) {
//     return {
//       lat: parseFloat(latLngMatch[1]),
//       lng: parseFloat(latLngMatch),
//     };
//   }

//   // Match @LAT,LNG in URL path as fallback
//   const atMatch = decodedUrl.match(/@([-\d.]+),([-\d.]+)/);
//   if (atMatch) {
//     return {
//       lat: parseFloat(atMatch[1]),
//       lng: parseFloat(atMatch),
//     };
//   }

//   return null;
// }



export function parseGoogleMapsUrl(url) {
  if (!url) return null;

  // Decode URL to handle encoded characters
  const decodedUrl = decodeURIComponent(url);

  // Match place_id param if exists
  const placeIdMatch = decodedUrl.match(/[?&]place_id=([^&]+)/);
  if (placeIdMatch) {
    return { placeId: placeIdMatch[1] };
  }

  // Match !3dLAT!4dLNG pattern (Google Maps place coordinates)
  const latLngMatch = decodedUrl.match(/!3d([-\d.]+)!4d([-\d.]+)/);
  if (latLngMatch) {
    return {
      lat: parseFloat(latLngMatch[1]),
      lng: parseFloat(latLngMatch[2]),
    };
  }

  // Match @LAT,LNG in URL path as fallback
  const atMatch = decodedUrl.match(/@([-\d.]+),([-\d.]+)/);
  if (atMatch) {
    return {
      lat: parseFloat(atMatch[1]),
      lng: parseFloat(atMatch[2]),
    };
  }

  // Match /LAT,LNG in URL path as another fallback
  const slashMatch = decodedUrl.match(/\/([-\d.]+),([-\d.]+)/);
  if (slashMatch) {
    return {
      lat: parseFloat(slashMatch[1]),
      lng: parseFloat(slashMatch[2]),
    };
  }

  return null;
}
