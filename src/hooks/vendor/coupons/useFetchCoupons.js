import { useQuery } from "@tanstack/react-query";
import { fetchCoupons } from "../../../services/vendor/coupons/endpointApi";

export const useFetchCoupons = (venueId, vendorId) => {
    return useQuery({
        queryKey: ['coupons', venueId, vendorId],
        queryFn: () => fetchCoupons({ venueId, vendorId }),
        staleTime: 2 * 60 * 1000, // 2 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        enabled: !!(venueId && vendorId), // Only fetch if both venueId and vendorId are provided
    });
};
