import api from "../../api";


export const fetchVendorVenueList = async () => {
    try {
        const response = await api.get('vendor/venues/getVenueSelectList');
        return response?.data;
    } catch (error) {
        console.error("Error fetching venue list:", error);
        throw error;

    }
}

export const AddSportPrice = async (payload) => {
    try {
        const response = await api.post('vendor/slotPrice/addingSlotPrice', payload);
        return response?.data;
    } catch (error) {
        console.error("Error adding sport price:", error);
        throw error;
    }
}

export const fetchSportPrice = async (payload) => {
    try {
        const response = await api.post('vendor/slotPrice/getSlotPricingList', payload);
        return response?.data;
    } catch (error) {
        console.error("Error fetching sport price:", error);
        throw error;
    }
}