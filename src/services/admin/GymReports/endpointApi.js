import api from "../../api";

// 🔹 Gym Booking Reports
export const getGymBookingReports = async () => {
  try {
    const res = await api.post("/vendor/gym/getBookingGymList");
    return res.data;
  } catch (err) {
    console.error("Error fetching Gym Booking Reports:", err);
    throw err;
  }
};

// 🔹 Gym Revenue Reports
export const getGymRevenueReports = async () => {
  try {
    const res = await api.post("/vendor/gym/getGymRevenueGymList");
    return res.data;
  } catch (err) {
    console.error("Error fetching Gym Revenue Reports:", err);
    throw err;
  }
};

// 🔹 Gym Rating Reports
export const getGymRatingReports = async () => {
  try {
    const res = await api.post("/vendor/gym/getGymRatingList");
    return res.data;
  } catch (err) {
    console.error("Error fetching Gym Rating Reports:", err);
    throw err;
  }
};

// 🔹 Gym Coupon Reports
export const getGymCouponReports = async () => {
  try {
    const res = await api.post("/vendor/gym/getGymCouponList");
    return res.data;
  } catch (err) {
    console.error("Error fetching Gym Coupon Reports:", err);
    throw err;
  }
};
