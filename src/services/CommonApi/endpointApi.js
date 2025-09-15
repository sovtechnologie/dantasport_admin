import api from "../api";

export const fetchStateList = async() =>{
    try {
        const response = await api.get("admin/banners/getStateList");
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch State list");
        throw error;
    }
}

export const fetchCityList = async(payload) =>{
    try {
        const response = await api.post("admin/banners/getCityList",payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch city");
        throw error;
    }
}