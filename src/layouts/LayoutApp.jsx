import { useEffect } from "react";
import { useAppDispatch } from "../redux/hook/hook";
import { getInforUser } from "../redux/user/userSlice";

const LayoutApp = ({ children }) => {
  const access_token = localStorage.getItem("access_token");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (window.location.pathname === "/login") {
      return;
    }
    if (access_token) dispatch(getInforUser());
  }, [dispatch, access_token]);
  return <>{children}</>;
};
export default LayoutApp;
