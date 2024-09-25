// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../redux/hook/hook";
// import { refreshToken } from "../redux/auth/authSlice";
// import { setLoginFail } from "../redux/user/userSlice";

const LayoutApp = ({ children }) => {
  // const dispatch = useAppDispatch();
  // const { EC, EM } = useAppSelector((state) => state.user);
  // console.log(EC, EM);
  // useEffect(() => {
  //   if (EC !== 0) {
  //     dispatch(refreshToken());
  //   }
  // }, [EC, dispatch]);
  return <>{children}</>;
};
export default LayoutApp;
