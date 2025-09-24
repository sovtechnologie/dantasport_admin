import api from "../../api";

// 🔹 Event Booking Reports
export const getEventBookingReports = async () => {
  try {
    const res = await api.post("/vendor/events/getEventBookings");
    return res.data;
  } catch (err) {
    console.error("Error fetching Event Booking Reports:", err);
    throw err;
  }
};

// 🔹 Event Revenue Reports
export const getEventRevenueReports = async () => {
  try {
    const res = await api.post("/vendor/events/getEventRevenueReports");
    return res.data;
  } catch (err) {
    console.error("Error fetching Event Revenue Reports:", err);
    throw err;
  }
};

// 🔹 Event Coupon Reports
export const getEventCouponReports = async () => {
  try {
    const res = await api.post("/vendor/events/getEventCouponReport");
    return res.data;
  } catch (err) {
    console.error("Error fetching Event Coupon Reports:", err);
    throw err;
  }
};

// 🔹 Event Review Reports
export const getEventReviewReports = async () => {
  try {
    const res = await api.post("/vendor/events/getEventReviews");
    return res.data;
  } catch (err) {
    console.error("Error fetching Event Review Reports:", err);
    throw err;
  }
};
