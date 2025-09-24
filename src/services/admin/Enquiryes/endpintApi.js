import api from "../../api";

// Corporate Enquiries API
export const getBookingEnquires = async () => {
  try {
    const res = await api.get("/admin/enquires/getBookingEnquires");
    return res.data;
  } catch (err) {
    console.error("Error fetching booking enquiries:", err);
    throw err;
  }
};

// Update Status & SubStatus
export const updateEnquiryStatus = async (payload) => {
  try {
    const res = await api.put(
      "/admin/enquires/updateStatusAndSubStatus",
      payload
    );
    console.log("update ujhd", res);
    return res.data;
  } catch (err) {
    console.error("Error updating enquiry status:", err);
    throw err;
  }
};
