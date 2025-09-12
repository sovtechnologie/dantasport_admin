import { useQuery } from "@tanstack/react-query";
import { getGymBookingList } from "../../../services/vendor/gym/endpointApi";

// Mirrors coupons hook style: `useGetCouponList`
export const useFetchGymBookingList = (params) => {
  const {
    vendorId,
    search = "",
    venueId = null,
    startDate = null,
    endDate = null,
    page = 1,
    limit = 10,
  } = params || {};

  return useQuery({
    queryKey: [
      "gymBookingList",
      vendorId,
      search,
      venueId,
      startDate,
      endDate,
      page,
      limit,
    ],
    queryFn: () =>
      getGymBookingList({ vendorId, search, venueId, startDate, endDate, page, limit }),
    enabled: !!vendorId,
    staleTime: 2 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    keepPreviousData: true,
  });
};


