import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInforVolunteerService } from "../../services/accountService";

export const getInforUser = createAsyncThunk("user/getInforUser", async () => {
  const response = await getInforVolunteerService();
  return response;
});

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  EC: null,
  EM: null,
  user: {
    id: "",
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    avatar: "",
    generation: "",
    school: "",
    major: "",
    birthday: "",
  },
  role: {
    id: "",
    name: "",
    description: "",
  },
  permissions: [],
  activeMenu: "home",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginFail: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setUserInfor: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user.id = action?.payload?.DT?.id;
      state.user.email = action?.payload?.DT?.email;
      state.user.full_name = action?.payload?.DT?.full_name;
      state.user.phone = action?.payload?.DT?.phone;
      state.user.gender = action?.payload?.DT?.gender;
      state.user.avatar = action?.payload?.DT?.avatar;
      state.user.generation = action?.payload?.DT?.generation;
      state.user.school = action?.payload?.DT?.school;
      state.user.major = action?.payload?.DT?.major;
      state.user.birthday = action?.payload?.DT?.birthday;
      state.user.role.id = action?.payload?.DT?.role.id;
      state.user.role.name = action?.payload?.DT?.role.name;
      state.user.role.description = action?.payload?.DT?.role.description;
      state.user.permissions = action?.payload?.DT?.role?.permissions ?? [];
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.EC = null;
      state.EM = null;
      state.user = {
        id: "",
        full_name: "",
        email: "",
        phone: "",
        gender: null,
        avatar: "",
        generation: "",
        school: "",
        major: "",
        birthday: "",
      };
      state.role = {
        id: "",
        name: "",
        description: "",
      };
      state.permissions = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInforUser.pending, (state, action) => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.EC = null;
    });
    builder.addCase(getInforUser.fulfilled, (state, action) => {
      if (action.payload.EC !== 0) {
        state.isAuthenticated = false;
        state.isLoading = true;
      }
      state.isAuthenticated = true;
      state.isLoading = false;
      state.EC = action.payload.EC ?? null;
      state.EM = action.payload.EM ?? null;
      state.access_token = action?.payload?.DT?.access_token;
      state.user.id = action?.payload?.DT?.infor?.id;
      state.user.email = action?.payload?.DT?.infor?.email;
      state.user.full_name = action?.payload?.DT?.infor?.full_name;
      state.user.phone = action?.payload?.DT?.infor?.phone;
      state.user.gender = action?.payload?.DT?.infor?.gender;
      state.user.avatar = action?.payload?.DT?.infor?.avatar;
      state.user.generation = action?.payload?.DT?.infor?.generation;
      state.user.school = action?.payload?.DT?.infor?.school;
      state.user.major = action?.payload?.DT?.infor?.major;
      state.user.birthday = action?.payload?.DT?.infor?.birthday;
      state.role.id = action?.payload?.DT?.role?.id;
      state.role.name = action?.payload?.DT?.role?.name;
      state.role.description = action?.payload?.DT?.role?.description;
      state.permissions = action?.payload?.DT?.role?.permissions ?? [];
    });

    builder.addCase(getInforUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.EC = null;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setLogout, setUserInfor, setRefreshToken, setLoginFail } =
  userSlice.actions;

export default userSlice.reducer;
