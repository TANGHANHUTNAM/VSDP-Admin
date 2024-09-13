import { createBrowserRouter } from "react-router-dom";
import LayoutApp from "../layouts/LayoutApp";
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
    path: "/admin",
    element: (
      <LayoutApp>
        <LayoutAdmin />
      </LayoutApp>
    ),

    children: [
      {
        index: true,
        element: (
          <ProtectRoute>
            <DashBoardPage />
          </ProtectRoute>
        ),
      },
      {
        path: "user",
        element: (
          <ProtectRoute>
            <UserPage />
          </ProtectRoute>
        ),
      },
      {
        path: "resume",
        element: (
          <ProtectRoute>
            <ResumePage />
          </ProtectRoute>
        ),
      },
      {
        path: "role",
        element: (
          <ProtectRoute>
            <RolePage />
          </ProtectRoute>
        ),
      },
      {
        path: "permission",
        element: (
          <ProtectRoute>
            <PermissionPage />
          </ProtectRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectRoute>
            <ProfilePage />
          </ProtectRoute>
        ),
      },
      {
        path: "setting",
        element: (
          <ProtectRoute>
            <SettingPage />
          </ProtectRoute>
        ),
      },
    ],
  },
  {
    path: "admin/login",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
