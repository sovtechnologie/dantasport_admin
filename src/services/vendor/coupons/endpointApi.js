import api from "../../api";

export const createCoupon = async (payload) => {
    try {
        const response = await api.post('vendor/coupon/createCoupon', payload);
        return response.data;
    } catch (error) {
        console.error("Error creating coupon:", error);
        throw error;
    }
};

export const fetchCoupons = async (payload) => {
    try {
        const response = await api.post('vendor/coupon/getCoupons', payload);
        return response.data;
    } catch (error) {
        console.error("Error fetching coupons:", error);
        throw error;
    }
};

export const getCouponList = async (payload) => {
    try {
        const response = await api.post('vendor/coupon/getCouponList', payload);
        return response.data;
    } catch (error) {
        console.error("Error fetching coupon list:", error);
        throw error;
    }
};

export const updateCoupon = async (payload) => {
    try {
        const response = await api.put('vendor/coupon/updateCoupon', payload);
        return response.data;
    } catch (error) {
        console.error("Error updating coupon:", error);
        throw error;
    }
};

export const deleteCoupon = async (couponId) => {
    try {
        const response = await api.delete(`vendor/coupon/deleteCoupon/${couponId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting coupon:", error);
        throw error;
    }
};
