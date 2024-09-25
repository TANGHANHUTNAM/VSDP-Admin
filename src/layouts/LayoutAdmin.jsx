import { Link, Outlet } from "react-router-dom";
import logovh from "../assets/images/logovh.png";
import {
  UploadOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
const { Header, Content, Sider } = Layout;
import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { RiUserSettingsLine } from "react-icons/ri";
import { GrShieldSecurity } from "react-icons/gr";
import { TbFileCv } from "react-icons/tb";
import HeaderDropdown from "../components/Header/HeaderDropdown";
const LayoutAdmin = () => {
  const role = "admin";
  const menuAdmin = [
    {
      key: "/",
      icon: <RxDashboard />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/user",
      icon: <FiUsers />,
      label: <Link to="/user">Tài khoản</Link>,
    },
    {
      key: "/role",
      icon: <RiUserSettingsLine />,
      label: <Link to="/role">Vai trò</Link>,
    },
    {
      key: "/permission",
      icon: <GrShieldSecurity />,
      label: <Link to="/permission">Quyền hạn</Link>,
    },
    {
      key: "/resume",
      icon: <TbFileCv />,
      label: <Link to="/resume">Hồ sơ</Link>,
    },
  ];
  const menuTNV = [
    {
      key: "",
      icon: <UserOutlined />,
      label: <Link to="">Dashboard</Link>,
    },
    {
      key: "/resume",
      icon: <UploadOutlined />,
      label: <Link to="/resume">Resume</Link>,
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const [menuItem, setMenuItem] = useState([]);

  useEffect(() => {
    if (role === "admin") {
      setMenuItem(menuAdmin);
    } else {
      setMenuItem(menuTNV);
    }
  }, [role]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "white" }}
        className="py-2"
      >
        {/* LOGO */}
        <div className="demo-logo-vertical text-black text-center p-2 flex justify-center overflow-hidden">
          {collapsed ? (
            <img src={logovh} alt="logovh" className="w-full" />
          ) : (
            <img src={logovh} alt="logovh" className="w-1/2" />
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={menuItem}
          className="mt-4"
        />
      </Sider>
      <Layout className="p-3 pb-0">
        <Header className="bg-white p-0 flex justify-between items-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          {/* Dropdown */}
          <HeaderDropdown />
        </Header>
        <Content className="h-full mt-3 bg-white p-3">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
