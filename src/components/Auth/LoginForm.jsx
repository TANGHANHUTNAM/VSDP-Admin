import logovh from "../../assets/images/logovh.png";
import { useForm } from "react-hook-form";
import LoginGG from "./LoginGG";
import { toast } from "react-toastify";
import statusCode from "../../utils/statusCode";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  setIsLogout,
  setResetStatus,
} from "../../redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook/hook";
import { getInforUser } from "../../redux/user/userSlice";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const handleLogin = async (data) => {
    dispatch(loginUser(data));
  };
  const navigate = useNavigate();
  const { EM, EC } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (EC === null) {
      return;
    }
    if (EC === statusCode.SUCCESS_DAFAULT) {
      dispatch(getInforUser());
      navigate("/");
    }
    if (EC !== statusCode.SUCCESS_DAFAULT) {
      toast.error(EM);
      dispatch(setResetStatus());
    }
  }, [EC, EM, navigate, dispatch]);

  const { isLogout } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (isLogout) {
      toast.success("Logout Success");
      dispatch(setIsLogout());
    }
  }, [isLogout]);

  return (
    <div className="form-login p-3 bg-white rounded-l-lg shadow-lg h-[500px]">
      <div className="header ">
        <div className="logo flex flex-col items-center justify-center gap-1">
          <img src={logovh} alt="" className="w-1/3" />
          <h1 className="text-2xl font-bold text-bgVH">VSDP</h1>
          <h1 className="text-xl font-bold text-bgVH">Đăng nhập</h1>
        </div>
      </div>
      <div className="form px-2 mt-2">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold text-black/70">Email:</label>
            <input
              type="text"
              className="border border-gray-300 py-1 px-2 outline-cyan-500"
              id="email"
              {...register("email", {
                required: "Email không được để trống",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email không đúng định dạng",
                },
              })}
            />
            <span className="text-red-400 text-sm font-medium">
              {errors.email?.message}
            </span>
          </div>
          <div className="w-full flex flex-col gap-1 ">
            <label className="font-semibold text-black/70">Password:</label>
            <div className="w-full relative">
              <input
                type={showPassword ? "password" : "text"}
                className="border w-full px-2 border-gray-300 p-1 outline-cyan-500"
                id="email"
                {...register("password", {
                  required: "Password không được để trống",
                  minLength: {
                    value: 6,
                    message: "Password phải lớn hơn 6 ký tự",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password phải nhỏ hơn 20 ký tự",
                  },
                })}
              />
              <div
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute right-2 bottom-1.5 flex text-black/65 cursor-pointer text-xl"
              >
                {showPassword ? (
                  <span className="">
                    <IoEye />
                  </span>
                ) : (
                  <span className="">
                    <IoEyeOff />
                  </span>
                )}
              </div>
            </div>
            <span className="text-red-400 text-sm font-medium">
              {errors.password?.message}
            </span>
          </div>

          <div className="flex justify-center border-solid border-b border-bgVH/40 pb-4">
            <button
              type="submit"
              className="text-white w-fit px-3 py-2 bg-bgVH mt-3 rounded-md font-medium"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
      <LoginGG />
    </div>
  );
};

export default LoginForm;
