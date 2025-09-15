import api from "../../api";

// Add Member API
export const addMember = async (formData) => {
  try {
    const response = await api.post("/vendor/members/addMembers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Members List API
export const getMembersList = async (payload) => {
  try {
    const response = await api.post("/vendor/members/getMembersList", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete Member API (using update endpoint with status 0)
export const deleteMember = async (payload) => {
  try {
    const response = await api.put("/vendor/members/updateMembers", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update Member API
export const updateMember = async (payload) => {
  try {
    // Check if payload is FormData or regular object
    const isFormData = payload instanceof FormData;
    
    const response = await api.put("/vendor/members/updateMembers", payload, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Single Member Details with Permissions API
export const getSingleMemberList = async (payload) => {
  try {
    const response = await api.post("/vendor/members/getSingleMemberList", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add Member Permissions API
// Payload: { memberId: member_id, data: [{ name: "Banner", status: 1 }] }
export const addingPermission = async (payload) => {
  try {
    const response = await api.post("/vendor/members/addingPermission", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update Member Permissions API
// Payload: { memberId: member_id, data: [{ name: "Banner", status: 1 }] }
export const updatePermission = async (payload) => {
  try {
    const response = await api.put("/vendor/members/updatePermission", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
