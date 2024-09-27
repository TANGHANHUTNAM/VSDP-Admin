import axiosClient from "axios";
import { Mutex } from "async-mutex";
import { setLogoutAuth, setRefreshTokenError } from "../redux/auth/authSlice";
import { setLogoutUser, setRefreshToken } from "../redux/user/userSlice";

import React from "react";
const instance = axiosClient.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

const callRefreshToken = async () => {
  const response = await instance.get("/api/v1/auth/refresh");
  if (response && response.DT) {
    return response.DT.access_token;
  } else return null;
};

// axiosClient.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${localStorage.getItem("access_token")}`;

const mutex = new Mutex();
export const loadingBarRef = React.createRef();

export const setStore = (store) => {
  instance.interceptors.request.use(
    function (config) {
      if (loadingBarRef.current) {
        loadingBarRef.current.continuousStart();
      }

      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
      return config;
    },
    function (error) {
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
      return Promise.reject(error);
    }
  );

  const NO_RETRY_HEADER = "x-no-retry";

  instance.interceptors.response.use(
    function (response) {
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
      return response && response.data ? response.data : response;
    },
    async (error) => {
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }

      // Cách 1
      const originalRequest = error.config;
      if (
        originalRequest &&
        error.response &&
        error.response.status === 401 &&
        !originalRequest.headers[NO_RETRY_HEADER]
      ) {
        console.log(error.response.data.EM);
        const access_token = await callRefreshToken();
        originalRequest.headers[NO_RETRY_HEADER] = "true";

        if (access_token) {
          originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
          localStorage.setItem("access_token", access_token);
          return instance.request(originalRequest);
        }
      }

      if (
        error.config &&
        error.response &&
        error.response.status === 410 &&
        error.config.url === "/api/v1/auth/refresh"
      ) {
        const message = error.response.data.EM;
        store.dispatch(setRefreshTokenError(message));
        store.dispatch(setLogoutAuth());
        store.dispatch(setLogoutUser());
      }

      // Cách 2
      // const originalRequest = error.config;
      // // Kiểm tra lỗi 401 và không phải là yêu cầu refresh token (tránh lặp)
      // if (
      //   error.response &&
      //   error.response.status === 401 &&
      //   !originalRequest._retry
      // ) {
      //   // Đánh dấu yêu cầu này là đã thử lại (retry) để tránh lặp
      //   originalRequest._retry = true;

      //   // mutex để đảm bảo chỉ có một yêu cầu refresh token chạy tại một thời điểm
      //   await mutex.runExclusive(async () => {
      //     try {
      //       const response = await instance.get("/api/v1/auth/refresh");
      //       const newAccessToken = response.DT.access_token;
      //       localStorage.setItem("access_token", newAccessToken);
      //       originalRequest.headers[
      //         "Authorization"
      //       ] = `Bearer ${newAccessToken}`;
      //       return instance.request(originalRequest);
      //     } catch (refreshError) {
      //       // refresh token thất bại, logout người dùng
      //       store.dispatch(setLogoutAuth());
      //       store.dispatch(setLogoutUser());
      //       return Promise.reject(refreshError);
      //     }
      //   });
      // }
      return error && error.response && error.response.data
        ? error.response.data
        : Promise.reject(error);
    }
  );
};
export default instance;
