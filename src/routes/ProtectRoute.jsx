import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import { useAppSelector } from "../redux/hook/hook";
// import NotPermitted from "../pages/NotPermitted";

// const RoleUser = ({ children }) => {
//   const isAdminRoute = window.location.pathname.includes("/");
//   const { role } = useAppSelector((state) => state.user);
//   const userRole = role.name;
//   if (isAdminRoute && userRole) {
//     return children;
//   } else {
//     return <NotPermitted />;
//   }
// };

const ProtectRoute = ({ children }) => {
  const { isLoading } = useAppSelector((state) => state.user);
  const access_token = localStorage.getItem("access_token");
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {isAuthenticated && access_token ? (
            <>{children}</>
          ) : (
            <Navigate to="/login" replace />
          )}
        </>
      )}
    </>
  );
};

export default ProtectRoute;
