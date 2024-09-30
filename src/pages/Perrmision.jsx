import { useEffect, useState } from "react";
import { getPermissionService } from "../services/permission";
const PermissionPage = () => {
  // const handleGetPermission = async () => {
  //   const res = await getPermissionService();
  //   if (res.EC === 0) {
  //     setTest(res.EM);
  //     console.log(res.DT);
  //   } else {
  //     console.log(res.EM);
  //   }
  // };
  const [test, setTest] = useState("");
  useEffect(() => {
    const handleGetPermission = async () => {
      const res = await getPermissionService();
      console.log(res);

      setTest(res.EM);
      console.log(res.EM);
    };
    handleGetPermission();
  }, []);

  return <div>{test}</div>;
};

export default PermissionPage;
