import { useQuery } from "@tanstack/react-query";
import { getBookingDetails, getBookedAndAvailbleBookings } from "../../../services/vendor/booking/endpointApi";

export const useGetBookingDetails = (sportId, venueId) => {
  return useQuery({
    queryKey: ['bookingDetails', sportId, venueId],
    queryFn: () => getBookingDetails({ sportId, venueId }),
    enabled: Boolean(sportId && venueId),
    staleTime: 60 * 1000,
  });
};


export const useGetAvailableCourts = (payload) => {
  return useQuery({
    queryKey: ['availableCourts', payload?.courtIds, payload?.type, payload?.startTime, payload?.endTime, payload?.date],
    queryFn: () => getBookedAndAvailbleBookings(payload),
    enabled: Boolean(payload && Array.isArray(payload.courtIds) && payload.courtIds.length > 0 && payload.type && payload.startTime && payload.endTime && payload.date),
    staleTime: 60 * 1000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 1,
  });
};


