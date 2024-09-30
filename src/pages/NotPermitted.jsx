import { Button, Result } from "antd";
import useTitle from "../hooks/useTitle";

const NotPermitted = () => {
  useTitle("403 Not Permitted");
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary">Back Home</Button>}
    />
  );
};

export default NotPermitted;
