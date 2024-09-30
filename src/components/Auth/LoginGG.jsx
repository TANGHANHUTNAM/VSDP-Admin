import { useState } from "react";
import gg from "../../assets/images/gg.png";
import { auth, provider } from "../../utils/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { loginGGService } from "../../services/authService";
import statusCode from "../../utils/statusCode";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook/hook";
import { setLoginAuth } from "../../redux/auth/authSlice";
import { getInforUser } from "../../redux/user/userSlice";
const LoginGG = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Handle Login Google
  const handleLoginGG = async () => {
    if (isLogin) return;
    setIsLogin(true);
    try {
      await signOut(auth);
      const res = await signInWithPopup(auth, provider);
      const { accessToken } = res.user;
      // handle api login
      const resAPI = await loginGGService({ tokenGoogle: accessToken });
      if (resAPI && resAPI.EC === statusCode.SUCCESS_DAFAULT) {
        localStorage.setItem("access_token", resAPI.DT.access_token);
        dispatch(setLoginAuth());
        dispatch(getInforUser());
        toast.success(resAPI.EM);
        navigate("/");
      }
      if (resAPI && resAPI.EC !== statusCode.SUCCESS_DAFAULT) {
        toast.error(resAPI.EM);
        await signOut(auth);
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại, vui lòng thử lại!");
    } finally {
      setIsLogin(false);
    }
  };
  return (
    <div className="mt-5 flex items-center justify-center gap-1">
      <h1 className="text-sm font-light mr-3">Hoặc</h1>
      <button
        disabled={isLogin}
        onClick={() => handleLoginGG()}
        className={`${
          isLogin ? "opacity-60" : ""
        } w-fit px-3 flex bg-slate-100 items-center cursor-pointer border-solid justify-center py-2 space-x-2 border border-gray-200 rounded shadow-md hover:bg-opacity-50 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 `}
      >
        <img src={gg} alt="" className="w-7" />
        <p className="font-medium">Google</p>
      </button>
    </div>
  );
};

export default LoginGG;
