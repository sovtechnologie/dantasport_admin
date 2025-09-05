import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCoupon } from "../../../services/vendor/coupons/endpointApi";

export const useUpdateCoupon = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCoupon,
        onSuccess: (data) => {
            // Invalidate and refetch coupons list
            queryClient.invalidateQueries({ queryKey: ['vendorCoupons'] });
            return data;
        },
        onError: (error) => {
            console.error("Update coupon error:", error);
            throw error;
        }
    });
};