import axios from "../utils/axiosCustomize";

export const getPermissionService = async () => {
  return await axios.get("/api/v1/permission");
};
