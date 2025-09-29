import api from "../../api";

export const fetchSportVenueList = async (payload) => {
    try {
        const response = await api.post('vendor/sports/getSportsListVendor',payload);
        return response.data;
    } catch (error) {
        console.error("Error fetching sport list:", error);
        throw error;
    }
};

export const CreateSportVenue = async(payload) =>{
    try {
        const response = await api.post("vendor/sports/addVendorSports",payload);
        return response?.data;
    } catch (error) {
        console.error("Error creating sport venue:",error);
        throw error;
    }
}

export const UpdateSportVenue = async(payload) =>{
    try {
        const response = await api.put("vendor/sports/updateVendorSports",payload);
        return response.data;
    } catch (error) {
        console.error("Error updating sport venue:",error);
        throw error;
    }
}
export const UpdatePriceSlot = async (payload) => {
    try {
        const response = await api.put("vendor/slotPrice/updatePriceSlot", payload);
        return response.data;
    } catch (error) {
        console.error("Error updating price slots:", error);
        throw error;
    }
};
export const getSportsListByCategory = async (payload) => {
    try {
        const response = await api.post('vendor/sports/getSportsListByCategory', payload);
        return response.data;
    } catch (error) {
        console.error("Error fetching sports list by category:", error);
        throw error;
    }
};