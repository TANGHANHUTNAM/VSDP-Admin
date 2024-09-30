import axios from "../utils/axiosCustomize";

export const loginService = async (data) => {
  return await axios.post("/api/v1/auth/login", data);
};

export const loginGGService = async (data) => {
  return await axios.post("/api/v1/auth/loginWithGoogle", data);
};

export const createAccountService = async (data) => {
  return await axios.post("/api/v1/auth/create", data);
};

export const refreshTokenService = async () => {
  return await axios.get("/api/v1/auth/refresh");
};

export const logoutService = async () => {
  return await axios.post("/api/v1/auth/logout");
};
