import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/";

const initialState = {
  message: null,
  error: null,
  loading: false,
  User: {},
  isAuthenticated: false,
  urlValid: false,
  open: false,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetauthstates: (state) => (state = initialState),
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
      state.loading = false;
    },
    authenticateUser: (state, action) => {
      state.error = null;
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.accessToken)
      );
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("isauthenticated", action.payload.success);
      state.User = action.payload.user;
      state.isAuthenticated = action.payload.success;
      state.open = true;
      state.loading = false;
      state.message = action.payload.message;
    },
    hideMessage: (state) => {
      state.open = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("isauthenticated", action.payload.success);
        state.User = action.payload.user;
        state.isAuthenticated = action.payload.success;
        state.message = action.payload.message;
        state.open = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.open = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});
export const signin = createAsyncThunk("auth/signin", async ({ state }) => {
  try {
    const response = await axios.post(`user`, state);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
export const signup = createAsyncThunk(
  "authentication/signup",
  async ({ state }) => {
    try {
      const response = await axios.post(`user`, state);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const authstate = (state) => state.auth;
export const { clearMessage, authenticateUser, resetauthstates, hideMessage } =
  authSlice.actions;
export default authSlice.reducer;
