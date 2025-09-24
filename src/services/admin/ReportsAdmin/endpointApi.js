import api from "../../api";

// Vendor Venue Booking Reports API
export const getVenueBookingReports = async () => {
  try {
    const res = await api.post("/vendor/venueReports/getVenueBookingReports");
    console.log("📊 Venue Booking Reports ===>", res);
    return res.data;
  } catch (err) {
    console.error("Error fetching Venue Booking Reports:", err);
    throw err;
  }
};

export const getVenueRevenueReports = async () => {
  try {
    const res = await api.post("/vendor/venueReports/getVenueRevenueReports");

    return res.data; // res.data me status, result etc honge
  } catch (err) {
    console.error("Error fetching Venue Revenue Reports:", err);
    throw err;
  }
};

export const getVenueReviewReports = async () => {
  try {
    const res = await api.post("/vendor/venueReports/getVenueReviewReports");

    return res.data; // return data object {status:200, result: [...]}
  } catch (err) {
    console.error("Error fetching Venue Review Reports:", err);
    throw err;
  }
};

export const getVenueCouponReports = async () => {
  try {
    const res = await api.post("/vendor/venueReports/getVenueCouponReports");
    console.log("📊 Venue Coupon Reports ===>", res);
    return res.data;
  } catch (err) {
    console.error("Error fetching Venue Coupon Reports:", err);
    throw err;
  }
};
