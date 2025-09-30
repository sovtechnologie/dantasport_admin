import api from "../../api";

export const FetchAllCourtVenue = async(payload)=>{
    try {
        const response = await api.post('vendor/court/getVendorCourtList',payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to fetch the court venue");
        throw error;
    }
}

export const FetchSingleCourt = async (payload) => {
  try {
    const response = await api.post("vendor/court/getSingleCourt", payload);
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch single court");
    throw error;
  }
};

// Add a new court
export const AddSingleCourt = async (payload) => {
  try {
    const response = await api.post("vendor/court/addSingleCourt", payload);
    return response?.data;
  } catch (error) {
    console.error("Failed to add court");
    throw error;
  }
};

// Update existing court
export const UpdateVendorCourt = async (payload) => {
  try {
    const response = await api.put("vendor/court/updateVendorCourt", payload);
    return response?.data;
  } catch (error) {
    console.error("Failed to update court");
    throw error;
  }
};