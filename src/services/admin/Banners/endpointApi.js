import api from "../../api";

export const CreateBanner = async (payload) => {
    try {
        const response = await api.post("admin/banners/createBanners", payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to Create banners");
        throw error;
    }
}

export const fetchBannerList = async ({ payload }) => {
    try {
        const response = await api.post("admin/banners/getBannerList", payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch banners list");
        throw error;
    }
}

export const UpdateBanner = async (payload) => {
    try {
        const response = await api.put("admin/banners/updateBanners", payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to update the banners");
        throw error;
    }
}

export const fetchStateList = async () => {
    try {
        const response = await api.get("admin/banners/createBanners");
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch State list");
        throw error;
    }
}

export const fetchCityList = async ({ payload }) => {
    try {
        const response = await api.post("admin/banners/getCityList", payload);
        return response?.data;
    } catch (error) {
        console.error('Failed to fetch city list');
        throw error;
    }
}

export const fetchVendortoVenueList = async(payload) =>{
    try {
        const response = await api.post("admin/banners/getVendorVenueList",payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch vendor to venue list");
        throw error;
    }
}


export const fetchCustomCityList = async() =>{
    try {
        const response = await api.get("admin/banners/getCustomCityList");
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch custom city list");
        throw error;
    }
}