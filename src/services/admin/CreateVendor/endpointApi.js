import api from "../../api";

// for vendor registeration
export const VendorSendOtp = async (payload) => {
  try {
    const response = await api.post("admin/vendors/vendorSendOtp", payload);
    return response?.data;
  } catch (error) {
    console.error("Failed to send Otp");
    throw error;
  }
};

export const VendorOtpVerification = async (payload) => {
  try {
    const response = await api.post(
      "admin/vendors/vendorOtpVerification",
      payload
    );
    return response?.data;
  } catch (error) {
    console.error("Failed to verify vendor otp", error);
    throw error;
  }
};

export const CreateVendor = async (payload) => {
  try {
    const response = await api.post("admin/vendors/createVendor", payload);
    return response?.data;
  } catch (error) {
    console.error("Failed to create booking");
    throw error;
  }
};

export const AddVendorBankingDetails = async (payload) => {
  try {
    const response = await api.post(
      "admin/vendors/addVendorBankingDetails",
      payload
    );
    return response?.data;
  } catch (error) {
    console.error("Failed to adding vendor banking details");
    throw error;
  }
};

export const fetchVendorList = async () => {
  try {
    const response = await api.get("admin/vendors/getVendorList");
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch vendor list");
    throw error;
  }
};

export const VendorStatusChange = async (payload) => {
  try {
    const response = await api.post("admin/vendors/changeStatus", payload);
    return response?.data;
  } catch (error) {
    console.error("Failed to vendor status");
    throw error;
  }
};

export const VendorRequestUpdateDetailsOtp = async (payload) => {
  try {
    const response = await api.post(
      "admin/vendors/requestUpdateVendorDetailsOtp",
      payload
    );
    return response?.data;
  } catch (error) {
    console.error("Failed to send vendor resquest update");
    throw error;
  }
};

export const UpdateVendorDetailsWithOtp = async (payload) => {
  try {
    const response = await api.post(
      "admin/vendors/updateVendorDetailsWithOtp",
      payload
    );
    return response?.data;
  } catch (error) {
    console.error("Failed to Update the vendor details");
    throw error;
  }
};

export const FetchSingleVendorDetails = async (payload) => {
  try {
    const response = await api.get(`/admin/vendors/getSingleVendor/${payload}`);
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch single deatils");
    throw error;
  }
};
