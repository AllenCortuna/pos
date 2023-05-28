import React from "react";
import { useNavigate } from "react-router-dom";
import notfound from "./img/404.svg";
const Notfound = () => {
  const navigate = useNavigate();
  return (
    <span className="w-screen h-screen flex ">
    <div className="grid max-w-sm m-auto ">
      <img
        src={notfound}
        alt="404 page"
        className="w-64 mx-auto mb-5 drop-shadow-md"
      />
      <p className="uppercase font-bold text-lg text-center text-zinc-600 mb-2 mt-5">
        pages not found
      </p>
      <p className="text-center text-sm text-zinc-500">
        The page you are looking for might have been removed had it name changed or temporary unavailable.
      </p>
    
        <button
          className="p-4 px-6 border-2 rounded-md text-white border-zinc-800 text-sm font-[400] bg-zinc-800 mx-auto mt-5"
          onClick={() => {
            navigate("/");
          }}
        >
          back
        </button>
    </div>
    </span>
  );
};

export default Notfound;
