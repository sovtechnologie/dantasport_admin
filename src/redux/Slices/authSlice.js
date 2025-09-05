import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../services/api";

// Login thunk accepting mobileNumber, role, and password
export const Login = createAsyncThunk(
  "auth/authLogin",
  async ({ mobileNumber, role, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/authLogin", {
        mobileNumber,
        role,
        password,
      });
       // Extract data
      const { token, result } = response.data;
      
      // Log token for development purposes
      if (process.env.NODE_ENV === 'development') {
        console.log('🔑 Login Token received:', token);
        console.log('👤 User data:', result && result[0]);
      }
      
       // Set token in cookies
      Cookies.set('token', token, { expires: 7, path: "/" }); // expires in 7 days

      // Return user data
      return result && result[0];
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to login"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      Cookies.remove('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout,clearError } = authSlice.actions;

export default authSlice.reducer;
