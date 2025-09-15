import api from "../../api";

export const CreateVenue = async (payload) => {
    try {
        const response = await api.post("admin/venue/createVenues", payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to create venue");
        throw error;
    }
}

export const fetchVenueList = async () => {
    try {
        const response = await api.get("admin/venue/getVenueList");
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch venue list");
        throw error;
    }
}

export const fetchSingleVenueDetails = async(payload) =>{
    try {
        const response = await api.post("admin/venue/getSingelVenue",payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch single venue details");
        throw error;
    }
}

export const UpdateStatus = async (payload) => {
    try {
        const response = await api.put("admin/venue/updateVenue", payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to Update venue status");
        throw error;
    }
}


export const GetAllVendor = async () => {
    try {
        const response = await api.get("admin/venue/getVendorList");
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch vendor list");
        throw error;
    }
}