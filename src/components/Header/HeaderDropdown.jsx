import { Dropdown } from "antd";
import Avatar from "../Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook/hook";
import { logoutUser, setIsLogout } from "../../redux/auth/authSlice";
import { useEffect } from "react";

const HeaderDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLogout } = useAppSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    if (isLogout) {
      dispatch(setIsLogout());
      navigate("/login");
    }
  }, [isLogout]);
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
        Quản trị viên! <b>Nhựt Nam</b>
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
