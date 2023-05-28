import React from "react";

const BtnEdit = ({ loading, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-xs text-zinc-500 border border-zinc-500 rounded-md shadow-md w-14 ${
        loading && "animate-pulse"
      }`}
      disabled={loading}
    >
      edit
    </button>
  );
};

export default BtnEdit;
