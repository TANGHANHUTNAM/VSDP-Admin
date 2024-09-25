import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
        extra={
          <Link to={"/"}>
            <Button type="primary">Trở về</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFoundPage;
