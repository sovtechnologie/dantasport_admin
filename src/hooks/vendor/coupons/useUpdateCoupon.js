import { useMutation } from "@tanstack/react-query";
import { updateCoupon, softDeleteCoupon } from "../../../services/vendor/coupons/endpointApi";

export const useUpdateCoupon = () => {
    return useMutation({
        mutationFn: updateCoupon,
        onSuccess: (data) => {
            console.log("Coupon updated successfully:", data);
            return data;
        },
        onError: (error) => {
            console.error("Update coupon error:", error);
            throw error;
        }
    });
};

export const useSoftDeleteCoupon = () => {
    return useMutation({
        mutationFn: softDeleteCoupon,
        onSuccess: (data) => {
            console.log("Coupon deleted successfully:", data);
            return data;
        },
        onError: (error) => {
            console.error("Soft delete coupon error:", error);
            throw error;
        }
    });
};