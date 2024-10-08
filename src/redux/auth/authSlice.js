import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: true,
  isRefreshError: false,
  messageRefreshError: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginAuth: (state) => {
      state.isAuthenticated = true;
    },
    setLogoutAuth: (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
    },
    setRefreshTokenError: (state, { payload }) => {
      state.isRefreshError = true;
      state.messageRefreshError = payload;
    },
    setResetRefreshTokenError: (state) => {
      state.isRefreshError = false;
      state.messageRefreshError = "";
    },
  },
  extraReducers: () => {
    // builder.addCase(loginUser.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isAuthenticated = true;
    //   state.access_token = action?.payload?.DT?.access_token ?? null;
    // });
  },
});

export const {
  setLoginAuth,
  setLogoutAuth,
  setRefreshTokenError,
  setResetRefreshTokenError,
} = authSlice.actions;

export default authSlice.reducer;
