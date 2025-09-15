import { useQuery } from "@tanstack/react-query";
import { fetchSingleVenueDetails } from "../../../services/admin/CreateVenue/endpointApi";

export const useFetchSingleVenue = (payload) =>{
    return useQuery({
            queryKey: ["SingleVenueDetails"],
            queryFn: () => {
                return fetchSingleVenueDetails(payload);
            },
            enabled: !!payload.venueId,
        })
}