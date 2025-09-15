import { useMutation } from "@tanstack/react-query";
import { createCoupon } from "../../../services/vendor/coupons/endpointApi";

export const useCreateCoupon = () => {
    return useMutation({
        mutationFn: createCoupon,
        onSuccess: (data) => {
            console.log("Coupon created successfully:", data);
        },
        onError: (error) => {
            console.error("Failed to create coupon:", error);
        },
    });
};
