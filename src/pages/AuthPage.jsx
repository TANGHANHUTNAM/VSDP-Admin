import LoginForm from "../components/Auth/LoginForm";
import vsdp from "../assets/images/vsdp.jpg";
import useTitle from "../hooks/useTitle";
const AuthPage = () => {
  useTitle("Login");
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="flex justify-center">
        {/* form */}
        <LoginForm />
        {/* img */}
        <div className="img shadow-lg w-[500px] h-[500px]">
          <img src={vsdp} alt="" className="rounded-r-lg w-full" />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
