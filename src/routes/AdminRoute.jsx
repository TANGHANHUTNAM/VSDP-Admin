import { createBrowserRouter } from "react-router-dom";
import LayoutAdmin from "../layouts/LayoutAdmin";
import NotFoundPage from "../pages/NotFoundPage";
import DashBoardPage from "../pages/DashBoardPage";
import AuthPage from "../pages/AuthPage";
import ProtectRoute from "./ProtectRoute";
import UserPage from "../pages/UserPage";
import ResumePage from "../pages/ResumePage";
import RolePage from "../pages/RolePage";
import PermissionPage from "../pages/Perrmision";
import ProfilePage from "../pages/ProfilePage";
import SettingPage from "../pages/SettingPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <LayoutAdmin />
      </ProtectRoute>
    ),

    children: [
      {
        index: true,
        element: <DashBoardPage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "resume",
        element: <ResumePage />,
      },
      {
        path: "role",
        element: <RolePage />,
      },
      {
        path: "permission",
        element: <PermissionPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
