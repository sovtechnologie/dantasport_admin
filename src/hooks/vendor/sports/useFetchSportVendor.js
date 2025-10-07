import { useQuery } from "@tanstack/react-query";
import { getVendorSportsList } from "../../../services/vendor/SportList/endpointApi";

export const useFetchVendorSportsList = (venueId) => {
  return useQuery({
    queryKey: ["vendorSportsList", venueId],
    queryFn: () => getVendorSportsList({ venueId }),
    enabled: !!venueId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};
