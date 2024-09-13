import gg from "../../assets/images/gg.png";
const LoginGG = () => {
  return (
    <div className="mt-5 flex items-center justify-center gap-1">
      <h1 className="text-sm font-light mr-3">Hoặc</h1>
      <div className="w-fit px-3 flex bg-slate-100 items-center cursor-pointer border-solid justify-center py-2 space-x-2 border border-gray-200 rounded shadow-md hover:bg-opacity-50 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 ">
        <img src={gg} alt="" className="w-7" />
        <p className="font-medium">Google</p>
      </div>
    </div>
  );
};

export default LoginGG;
