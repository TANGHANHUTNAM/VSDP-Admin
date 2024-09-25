import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginService,
  logoutService,
  refreshTokenService,
} from "../../services/authService";
import { setLogout } from "../user/userSlice";

export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  const response = await loginService(data);
  return response;
});

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    const response = await logoutService();
    if (response.EC === 0) {
      thunkAPI.dispatch(setlogout());
      thunkAPI.dispatch(setLogout());
    }
    return response;
  }
);

const initialState = {
  access_token: null,
  isRefreshToken: false,
  errorRefreshToken: null,
  isLogout: false,
  EC: null,
  EM: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccess_token: (state, action) => {
      state.access_token = action?.payload?.DT.access_token;
    },
    setlogout: (state) => {
      state.access_token = null;
      localStorage.removeItem("persist:root");
      state.isLogout = true;
      state.EC = null;
      state.EM = null;
    },
    setIsLogout: (state) => {
      state.isLogout = false;
    },
    setResetStatus: (state) => {
      state.EC = null;
      state.EM = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.access_token = action?.payload?.DT?.access_token ?? null;
        state.EC = action.payload.EC;
        state.EM = action.payload.EM;
      }
    });
  },
});

export const {
  setAuth,
  setlogout,
  setIsLogout,
  setResetStatus,
  setAccess_token,
} = authSlice.actions;

export default authSlice.reducer;
