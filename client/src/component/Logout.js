import { useNavigate } from "react-router-dom";
import { userStore } from "../zustand/user";
import Layout from "./Layout";

const Logout = () => {
  const navigate = useNavigate();
  const setCurUsr = userStore((state) => state.setCurUsr);

  return (
    <Layout
      element={
        <div className="grid p-4 mt-[30%] md:mt-60 gap-5 min-w-[18rem] max-w-[24rem] mx-auto ">
          <span className=" text-center">
            <h1 className="font-bold uppercase text-cyan-800 text-xl drop-shadow-sm ">
              logout
            </h1>
            <p className="text-sm text-gray-400 rale">
              Logout and clear Session ?
            </p>
          </span>
          <span className="flex flex-row gap-5 mx-auto ">
            <button
              className="p-4 border-2 rounded-md text-zinc-400 border-zinc-400 text-sm font-[400] "
              onClick={() => {
                navigate(-1);
              }}
            >
              cancel
            </button>

            <button
              className="p-4 border-2 rounded-md text-white border-zinc-800 text-sm font-[400] bg-zinc-800"
              onClick={() => {
                localStorage.clear();
                setCurUsr(null);
                navigate("/login");
              }}
            >
              logout
            </button>
          </span>
        </div>
      }
    />
  );
};

export default Logout;
