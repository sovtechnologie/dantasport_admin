import { useQuery } from "@tanstack/react-query";
import { getSingleCoupon } from "../../../services/vendor/coupons/endpointApi";

export const useGetSingleCoupon = (couponId) => {
  return useQuery({
    queryKey: ["singleCoupon", couponId],
    queryFn: () => getSingleCoupon(couponId),
    enabled: !!couponId, // fetch only if couponId exists
  });
};
