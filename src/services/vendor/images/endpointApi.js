import api from "../../api";

export const fetchGalleryImagesList = async (payload) => {
    try {
        const response = await api.post('vendor/image/getImageGallery', payload);
        return response.data;
    } catch (error) {
        console.error("Error fetching images list:", error);
        throw error;
    }
}

export const AddGalleryImage = async (formData) => {
    try {
        console.log("🌐 API Call: vendor/image/addImageGallery");
        console.log("📋 FormData being sent:", formData);
        
        const response = await api.post("vendor/image/addImageGallery", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        console.log("✅ API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ API Error uploading image:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        console.error("Error config:", error.config);
        throw error;
    }
}

export const UpdateGalleryImage = async (formData) => {
    try {
        console.log("🌐 API Call: vendor/image/updateImageGallery");
        console.log("📋 FormData being sent:", formData);
        
        const response = await api.put("vendor/image/updateImageGallery", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        console.log("✅ API Response:", response.data);
        console.log("📊 Response Status:", response.status);
        return response.data;
    } catch (error) {
        console.error("❌ API Error updating image:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        console.error("Error config:", error.config);
        throw error;
    }
}

export const DeleteGalleryImage = async (payload) => {
    try {
        console.log("🌐 API Call: vendor/image/deleteSingleImage");
        console.log("📋 Payload being sent:", payload);
        
        const response = await api.delete("vendor/image/deleteSingleImage", {
            data: payload
        });
        
        console.log("✅ API Response:", response.data);
        console.log("📊 Response Status:", response.status);
        return response.data;
    } catch (error) {
        console.error("❌ API Error deleting image:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        console.error("Error config:", error.config);
        throw error;
    }
}