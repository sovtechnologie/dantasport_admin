import api from "../../api";

export const AddSports = async (payload) => {
    try {
        console.log("in api payload",payload)
        const response = await api.post("admin/sports/addSports", payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to add Sports");
        throw error;
    }
}

export const UpdateSport = async (payload) => {
    try {
        const response = await api.put("admin/sports/updateSports", payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to update sport");
        throw error;
    }
}

export const fetchsList = async () => {
    try {
        const response = await api.get("admin/sports/getSportsList");
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch sport list");
        throw error;
    }
}