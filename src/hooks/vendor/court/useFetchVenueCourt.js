import { useQuery } from "@tanstack/react-query";
import { FetchAllCourtVenue } from "../../../services/vendor/Court/endpointsApi";

export const useFetchVenueCourt = (payload) => {
    return useQuery({
        queryKey: ["VenueCourtList", payload?.venueId],
        queryFn: () => FetchAllCourtVenue(payload),
        enabled: !!payload?.venueId,
    });
}