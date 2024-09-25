import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshTokenService } from "../services/authService";
import { setRefreshToken } from "../redux/user/userSlice";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Add a request interceptor
export const setStore = (store) => {
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      // Config header
      const access_token = store.getState().auth.access_token;
      if (access_token) {
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response && response.data ? response.data : response;
    },
    async (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        const response = await refreshTokenService();
        if (response) {
          // error.config.headers[
          //   "Authorization"
          // ] = `Bearer ${response.DT.access_token}`;
          // await store.dispatch(setRefreshToken(response));
          // return instance.request(error.config);
        }
      }
      return error && error.response && error.response.data
        ? error.response.data
        : Promise.reject(error);
    }
  );
};
export default instance;
