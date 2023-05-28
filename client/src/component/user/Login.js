import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../zustand/user";
import { BiUserCircle } from "react-icons/bi";
import { BsShieldLock } from "react-icons/bs";

const Login = () => {
  const navigate = useNavigate();
  const login = userStore((state) => state.login);
  const loading = userStore((state) => state.loading);
  const [data, setdata] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    login(data, navigate);
  };

  const input =
    "border-2 focus:border-cyan-800 border-zinc-300 text-zinc-500 font-[500] text-lg p-3  rounded-md w-full bg-none my-4 focus:outline-none focus:border-cyan-700";
  return (
    <span className="w-screen h-screen flex">
      <form className="m-auto grid bg-white shadow-lg m-auto min-w-[23rem] max-w-[26rem] h-auto border-2 border-zinc-300 rounded-2xl">
        <h4 className="font-semibold text-white text-3xl text-center mb-5 bg-zinc-700 p-5 rounded-tr-xl rounded-tl-xl ">
          Login
        </h4>
        <span className="m-auto grid rounded-xl p-5">
          <p className="text-lg text-zinc-600 mt-5 font-[500] ">
            <BiUserCircle className="text-xl ml-2 mr-1 inline lato" /> Username
          </p>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className={input}
          />
          <p className="text-lg text-zinc-600 mt-5 font-[500]">
            <BsShieldLock className="text-xl ml-2 mr-1 inline lato" /> Password
          </p>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className={input}
          />

          <h4
            className="underline text-sm my-4 ml-4 text-zinc-500"
            onClick={() => navigate("/reset")}
          >
            Forgot Password?
          </h4>

          <button
            type="submit"
            disabled={loading}
            className={`p-4 px-8 font-[500] text-md border-2 rounded-md bg-zinc-800 text-white mr-0 mt-8 m-auto ${
              loading && "animate-pulse"
            }`}
            onClick={handleSubmit}
          >
            {loading ? "Processing" : "Login"}
          </button>
        </span>
      </form>
    </span>
  );
};

export default Login;
