
import api from "../../api";


export const getEventList = async (payload) => {
  try {
    const response = await api.post("vendor/events/getEvenList", payload);
    console.log("Event list response:", response);
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch event list", error);
    throw error;
  }
};


export const createEvent = async (payload) => {
  try {
    const response = await api.post("vendor/events/createEvents", payload);
    console.log("Event creation response:", response);
    return response?.data;
  } catch (error) {
    console.error("Failed to create event", error);
    throw error;
  }
};
