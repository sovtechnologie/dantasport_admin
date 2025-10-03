import api from "../../api";

// Gym bookings list API
export const getBookingGymList = async (payload) => {
  try {
    const response = await api.post("vendor/gym/getBookingGymList", payload);

    console.log("responseresponseresponseresponse", response);
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch gym booking list", error);
    throw error;
  }
};

export const getRecentCheckingByGym = async (payload) => {
  try {
    const response = await api.post(
      "/vendor/gym/getRecentCheckingByGym",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch recent checking data", error);
    throw error;
  }
};

export const verifyAndCheckInGym = async (gymId, userId, checkInType = 2) => {
  try {
    const payload = { checkInType };
    const response = await api.post(
      `/user/gym/verifyAndCheckIn/${gymId}/${userId}`,
      payload
    );
    return response.data;
  } catch (error) {
    if (error?.response?.status === 404) {
      return Promise.reject(new Error("Invalid User"));
    }
    if (error?.response?.status === 400) {
      return Promise.reject(new Error("Please recharge your passes"));
    }
    console.error("Failed to verify and check-in gym", error);
    throw error;
  }
};

export const getPendingCheckingByGym = async (payload) => {
  try {
    const response = await api.post(
      "/vendor/gym/getPendingGymCheckingByGym",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch pending checking data", error);
    throw error;
  }
};

// Add Gym Member API (using venue member endpoint)
export const addGymMember = async (formData) => {
  try {
    const response = await api.post("/vendor/members/addMembers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Gym Members List API (using venue member endpoint)
export const getGymMembersList = async (payload) => {
  try {
    const response = await api.post("/vendor/members/getMembersList", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete Gym Member API (using venue member endpoint)
export const deleteGymMember = async (payload) => {
  try {
    const response = await api.put("/vendor/members/updateMembers", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update Gym Member API (using venue member endpoint)
export const updateGymMember = async (payload) => {
  try {
    // Check if payload is FormData or regular object
    const isFormData = payload instanceof FormData;

    const response = await api.put("/vendor/members/updateMembers", payload, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Single Gym Member Details with Permissions API (using venue member endpoint)
export const getSingleGymMemberList = async (payload) => {
  try {
    const response = await api.post(
      "/vendor/members/getSingleMemberList",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add Gym Member Permissions API (using venue member endpoint)
// Payload: { memberId: member_id, data: [{ name: "Banner", status: 1 }] }
export const addingGymMemberPermission = async (payload) => {
  try {
    const response = await api.post(
      "/vendor/members/addingPermission",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update Gym Member Permissions API (using venue member endpoint)
// Payload: { memberId: member_id, data: [{ name: "Banner", status: 1 }] }
export const updateGymMemberPermission = async (payload) => {
  try {
    const response = await api.put(
      "/vendor/members/updatePermission",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Gym Booking List (Reports → Booking for Gym)
// Endpoint: /vendor/gym/getBookingGymList (POST)
// Accepts payload: { vendorId, search, venueId, startDate, endDate, page, limit }
// Returns: { status, message, result: [ { booking_id, passes_name, price, total_passes, total_check_in, mobile_number, gym_name, user_id, full_name, amount, booking_date } ] }
export const getGymBookingList = async (payload) => {
  try {
    const response = await api.post("/vendor/gym/getBookingGymList", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Gym Coaches List API
// Endpoint: /vendor/gym/getCoachesList (POST)
// Payload: { gymId: number, type: "gym" }
// Returns: { status: 200, message: true, result: [{ id, gym_id, coaches_name, coaches_type, coaches_image, status, created_at, updated_at, type }] }
export const getGymCoachesList = async (payload) => {
  try {
    const response = await api.post("/vendor/gym/getCoachesList", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add Gym Coach API
// Endpoint: /vendor/gym/addGymCoaches (POST)
// Payload: FormData with { gymId, coacheName, coacheImage, coacheType, type }
// Returns: { status: 200, message: true, result: {...} }
export const addGymCoach = async (formData) => {
  try {
    const response = await api.post("/vendor/gym/addGymCoaches", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update Gym Coach API
// Endpoint: /vendor/gym/updateGymCoaches (PUT)
// Payload: FormData with { coachesId, coacheName, coacheType, image }
// Returns: { status: 200, message: true, result: {...} }
export const updateGymCoach = async (formData) => {
  try {
    const response = await api.put("/vendor/gym/updateGymCoaches", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete Gym Coach API
// Endpoint: /vendor/gym/deleteGymCoaches (DELETE)
// Payload: { coachesId: number }
// Returns: { status: 200, message: true, result: {...} }
export const deleteGymCoach = async (payload) => {
  try {
    const response = await api.delete("/vendor/gym/deleteGymCoaches", {
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Gym Time Slot List API
// Endpoint: /vendor/gym/getGymTImeSlotList (POST)
// Payload: { gymId: number }
// Returns: { status: 200, message: true, result: [{ id, gym_id, start_time, end_time, days_schedule, monday, tuesday, wednesday, thursday, friday, saturday, sunday, created_at, updated_at }] }
export const getGymTimeSlotList = async (payload) => {
  try {
    const response = await api.post("/vendor/gym/getGymTImeSlotList", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add Gym Time Slot API
// Endpoint: /vendor/gym/addGymTimeSlot (POST)
// Payload: { gymId, startTime, endTime, days_schedule, monday, tuesday, wednesday, thursday, friday, saturday, sunday }
// Returns: { status: 200, message: true, result: {...} }
export const addGymTimeSlot = async (payload) => {
  try {
    const response = await api.post("/vendor/gym/addGymTimeSlot", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update Gym Time Slot API
// Endpoint: /vendor/gym/updateGymTimeSlot (PUT)
// Payload: { gymTimeSlotId, startTime, endTime, days_schedule, monday, tuesday, wednesday, thursday, friday, saturday, sunday }
// Returns: { status: 200, message: true }
export const updateGymTimeSlot = async (payload) => {
  try {
    const response = await api.put("/vendor/gym/updateGymTimeSlot", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete Gym Time Slot API
// Endpoint: /vendor/gym/deleteGymTimeSlot (POST)
// Payload: { gymTimeSlotId: number }
// Returns: { status: 200, message: true }
export const deleteGymTimeSlot = async (payload) => {
  try {
    const response = await api.post("/vendor/gym/deleteGymTimeSlot", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
