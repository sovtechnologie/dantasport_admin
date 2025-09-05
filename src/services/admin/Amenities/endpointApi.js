import api from "../../api";

export const CreateAmenities = async (payload) => {
    try {
        const response = await api.post("admin/amenties/createAmenties", payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to add amenities");
        throw error;
    }
}

export const UpdateAmenities = async (payload) => {
    try {
        const response = await api.put("admin/amenties/updateAmenties", payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to update amenities");
        throw error;
    }
}

export const fetchAmenitieslist = async() =>{
    try {
        const response = await api.get("admin/amenties/getAmentiesList");
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch amnities list");
        throw error;
    }
}