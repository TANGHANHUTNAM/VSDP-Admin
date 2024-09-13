import { Dropdown } from "antd";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
const HeaderDropdown = () => {
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
      label: "Đăng xuất",
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
