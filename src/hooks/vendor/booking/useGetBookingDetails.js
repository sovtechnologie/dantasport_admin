import { useQuery } from "@tanstack/react-query";
import { getBookingDetails } from "../../../services/vendor/booking/endpointApi";

export const useGetBookingDetails = (sportId, venueId) => {
  return useQuery({
    queryKey: ['bookingDetails', sportId, venueId],
    queryFn: () => getBookingDetails({ sportId, venueId }),
    enabled: Boolean(sportId && venueId),
    staleTime: 60 * 1000,
  });
};


