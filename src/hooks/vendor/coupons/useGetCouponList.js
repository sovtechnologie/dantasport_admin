import { useQuery } from "@tanstack/react-query";
import { getCouponList } from "../../../services/vendor/coupons/endpointApi";

export const useGetCouponList = (vendorId, type = 1) => {
    return useQuery({
        queryKey: ['couponList', vendorId, type],
        queryFn: () => getCouponList({ vendorId, type }),
        staleTime: 2 * 60 * 1000, // 2 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        enabled: !!vendorId, // Only fetch if vendorId is provided
    });
};
