import { Dropdown } from "antd";
import Avatar from "../Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook/hook";
import { setLogoutAuth } from "../../redux/auth/authSlice";
import { toast } from "react-toastify";
import { logoutService } from "../../services/authService";
import { setLogoutUser } from "../../redux/user/userSlice";
import { FaUserCog } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
const HeaderDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Xử lý logout
  const user = useAppSelector((state) => state.user);
  const handleLogout = async () => {
    const res = await logoutService();
    if (res.EC === 0) {
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
      label: <Link to="/profile">Trang cá nhân</Link>,
      key: "/profile",
      icon: <FaUserCog />,
    },
    {
      label: <Link to="/setting">Cài đặt</Link>,
      key: "/setting",
      icon: <IoMdSettings />,
    },
    {
      label: <span onClick={() => handleLogout()}>Đăng xuất</span>,
      key: "log out",
      icon: (
        <span onClick={() => handleLogout()}>
          <TbLogout2 />
        </span>
      ),
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
