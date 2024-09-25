import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import { useAppSelector } from "../redux/hook/hook";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ProtectRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Đăng nhập thành công");
    }
  });
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>{isAuthenticated ? children : <Navigate to="/login" />}</>
      )}
    </>
  );
};

export default ProtectRoute;
