import api from "../../api";

export const getBookingDetails = async (payload) => {
  try {
    const response = await api.post(
      "vendor/bookings/getBookingDetails",
      payload
    );
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch booking details");
    throw error;
  }
};
export const updateVenueBookings = async (payload) => {
  try {
    const response = await api.put(
      "vendor/bookings/updateVenueBookings",
      payload
    );
    return response?.data;
  } catch (error) {
    console.error("Failed to update venue booking:", error);
    throw error;
  }
};

export const getBookedAndAvailableBookings = async (payload) => {
  try {
    const response = await api.post(
      "vendor/bookings/getBookedAndAvailbleBookings",
      payload
    );
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch booked and available bookings");
    throw error;
  }
};

export const createBooking = async (payload) => {
  try {
    const response = await api.post("user/bookings/createBookings", payload);
    return response?.data;
  } catch (error) {
    console.error("Failed to create booking", error);
    throw error;
  }
};

export const updateVenueBooking = async (payload) => {
  try {
    const response = await api.put(
      "vendor/bookings/updateVenueBookings",
      payload
    );
    return response?.data;
  } catch (error) {
    console.error("Failed to update venue booking", error);
    throw error;
  }
};
