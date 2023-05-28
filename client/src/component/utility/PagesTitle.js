import React from "react";

const PagesTitle = ({ text }) => {
  return (
    <div className="fixed top-0 rounded-bl-lg rounded-br-lg bg-zinc-800 z-60 p-2 h-auto shadow-lg w-40">
      <p className="text-lg uppercase font-semibold text-white text-center">{text}</p>
    </div>
  );
};

export default PagesTitle;
