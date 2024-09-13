import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const ProtectRoute = ({ children }) => {
  const isAuth = true;
  const isLoading = false;
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>{isAuth ? <>{children}</> : <Navigate to="admin/login" replace />}</>
      )}
    </>
  );
};

export default ProtectRoute;
