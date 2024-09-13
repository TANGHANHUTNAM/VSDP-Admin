import { UserOutlined } from "@ant-design/icons";
import { Avatar as Avt } from "antd";

const Avatar = ({ size = 34, src, ...props }) => {
  return (
    <Avt
      size={size}
      style={{
        color: "white",
        cursor: "pointer",
      }}
      icon={<UserOutlined className="text-lg" />}
      src={src || undefined}
      {...props}
      className="bg-bgVH"
    />
  );
};

export default Avatar;
