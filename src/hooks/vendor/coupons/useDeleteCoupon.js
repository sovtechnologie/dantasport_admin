import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCoupon } from "../../../services/vendor/coupons/endpointApi";

export const useDeleteCoupon = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: deleteCoupon,
        onSuccess: (data, couponId) => {
            console.log("Coupon deleted successfully:", data);
            // Invalidate and refetch coupons queries
            queryClient.invalidateQueries({ queryKey: ['coupons'] });
        },
        onError: (error) => {
            console.error("Failed to delete coupon:", error);
        },
    });
};
