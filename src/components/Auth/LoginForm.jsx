import logovh from "../../assets/images/logovh.png";
import { useForm } from "react-hook-form";
import LoginGG from "./LoginGG";
const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const handleLogin = async (data) => {
    console.log(data);
  };
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
            <label className="font-semibold">Email:</label>
            <input
              type="text"
              className="border border-gray-300 p-1 outline-cyan-500"
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
          <div className="w-full flex flex-col gap-1">
            <label className="font-semibold">Password:</label>
            <input
              type="password"
              className="border border-gray-300 p-1 outline-cyan-500"
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
