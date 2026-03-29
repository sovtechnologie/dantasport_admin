import api from "../../api";

export const coachesAcademyListgetAll = async () => {
    try {
        const response = await api.get(
"vendor/coaches/getCoachesAcademyList");
        return response.data;
    } catch (error) {
        console.error("Error fetching coaches academy list:", error);
        throw error;
    }
};

export const createCoachesAndAcademy = async (payload) => {
  try {
    const response = await api.post(
      "vendor/coaches/createCoachesAndAcademy",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating coach/academy:", error);
    throw error;
  }
};

export const getCoachById = async (id) => {
  return api.post("vendor/coaches/getSingleCoachesAcademy", {
    coachesAcaademyId: id,
  });
};


export const updateCoachesAndAcademy = async (payload) => {
  try {
   const res = await api.put(
    "vendor/coaches/updateCoachesAndAcademy",
    payload
  );
  return res.data;
  } catch (error) {
    console.error("Error creating coach/academy:", error);
    throw error;
  }
};

export const getLeadMangementSystem = async (payload) => {
  try {
    const response = await api.post(
      "vendor/coaches/leadMangementSystem",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching lead management system data:", error);
    throw error;
  }
};



export const updateLeadMangmentSystem = async (payload) => {
  try {
    const response = await api.put(
      "vendor/coaches/updateLeadMangmentSystem",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching lead management system data:", error);
    throw error;
  }
};