import api from "../../api";

// User Total Booking Tuf API
export const getUserTotalBookingTuf = async () => {
  try {
    const res = await api.get("/admin/services/getUserTotalBookingTuf");
    console.log("RRRRRRRRRRRR", res);
    return res.data;
  } catch (err) {
    console.error("Error fetching User Total Booking Tuf:", err);
    throw err;
  }
};

// User Total Attend Events API
export const getUserTotalAttendEvents = async () => {
  try {
    const res = await api.get("/admin/services/getUserTotalAttendEvents");
    console.log("ooooo", res);
    return res.data;
  } catch (err) {
    console.error("Error fetching User Total Attend Events:", err);
    throw err;
  }
};

// User Total Play Games API
export const getUserTotalPlayGames = async () => {
  try {
    const res = await api.get("/admin/services/getUserTotalPlayGames");
    return res.data;
  } catch (err) {
    console.error("Error fetching User Total Play Games:", err);
    throw err;
  }
};
