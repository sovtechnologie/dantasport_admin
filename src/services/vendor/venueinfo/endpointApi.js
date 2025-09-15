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

export const fetchActiveAmenities = async () => {
    try {
        const response = await api.get('vendor/venues/getActiveAmenities');
        return response?.data;
    } catch (error) {
        console.error("Error fetching active amenities:", error);
        throw error;
    }
}

export const addGym = async (formData) => {
    try {
        const response = await api.post('vendor/gym/addGym', formData);
        return response?.data;
    } catch (error) {
        console.error("Error adding gym:", error);
        throw error;
    }
}

export const fetchGymList = async (payload) => {
    try {
        const response = await api.post('vendor/gym/getGymList', payload);
        return response?.data;
    } catch (error) {
        console.error("Error fetching gym list:", error);
        throw error;
    }
}

// Fetch single gym details by id
export const fetchGymDetails = async (gymId) => {
    try {
        const response = await api.post('vendor/gym/getSingleGym', { gymId: Number(gymId) });
        return response?.data;
    } catch (error) {
        console.error("Error fetching gym details:", error);
        throw error;
    }
}

// Update gym by id
export const updateGym = async ({ gymId, formData }) => {
    try {
        const response = await api.post(`vendor/gym/updateGym/${gymId}`, formData);
        return response?.data;
    } catch (error) {
        console.error("Error updating gym:", error);
        throw error;
    }
}

// Delete gym by id (soft delete using isDelete flag)
export const deleteGym = async ({ gymId, isDelete }) => {
    try {
        const response = await api.put('vendor/gym/updateGym', { gymId, isDelete });
        return response?.data;
    } catch (error) {
        console.error("Error deleting gym:", error);
        throw error;
    }
}