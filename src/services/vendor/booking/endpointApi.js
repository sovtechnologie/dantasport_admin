import api from "../../api";

export const getBookingDetails = async (payload) => {
  try {
    const response = await api.post('vendor/bookings/getBookingDetails', payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw error;
  }
};


// Get all available courts for given courtIds and time window
export const getBookedAndAvailbleBookings = async (payload) => {
  try {
    const response = await api.post('vendor/bookings/getBookedAndAvailbleBookings', payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching available courts:", error);
    throw error;
  }
};


