import axios from "../utils/axiosCustomize";

export const getInforVolunteerService = async () => {
  return await axios.get("/api/v1/volunteer/account");
};
