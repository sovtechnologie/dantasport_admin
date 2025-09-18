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
