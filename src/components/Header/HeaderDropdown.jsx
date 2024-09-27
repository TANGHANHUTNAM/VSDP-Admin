import { Dropdown } from "antd";
import Avatar from "../Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook/hook";
import { setLogoutAuth } from "../../redux/auth/authSlice";
import { toast } from "react-toastify";
import { logoutService } from "../../services/authService";
import { setLogoutUser } from "../../redux/user/userSlice";

const HeaderDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  // Xử lý logout
  const handleLogout = async () => {
    const res = await logoutService();
    if (res.EC === 0) {
      // dispatch(setLogoutUser());
      dispatch(setLogoutAuth());
      dispatch(setLogoutUser());
      navigate("/login");
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  const items = [
    {
      label: <Link to="/admin/profile">Trang cá nhân</Link>,
      key: "/admin/profile",
    },
    {
      label: <Link to="/admin/setting">Cài đặt</Link>,
      key: "/admin/setting",
    },
    {
      label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
      key: "log out",
    },
  ];
  return (
    <div className="flex">
      <div className="mr-3">
        {user.role.name} <b>{user.user.email}</b>
      </div>
      <Dropdown
        menu={{ items }}
        trigger={["hover"]}
        className="min-h-fit mr-4 "
      >
        <div>
          <Avatar />
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderDropdown;
