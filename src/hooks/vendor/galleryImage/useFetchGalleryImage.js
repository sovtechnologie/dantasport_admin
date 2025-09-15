import { useQuery } from "@tanstack/react-query";
import { fetchGalleryImagesList } from "../../../services/vendor/images/endpointApi";

export const useFetchGalleryImage = (payload) => {
    return useQuery({
        queryKey: ["galleryImagesList", payload?.venueId, payload?.type],
        queryFn: ({ queryKey }) => fetchGalleryImagesList({ venueId: queryKey[1], type: queryKey[2] }),
        enabled: !!payload?.venueId,
    });
};