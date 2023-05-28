import React from "react";

const BtnDelete = ({ loading, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-xs text-zinc bg-red-600 text-white border border-red-600 rounded-md shadow-md min-w-14  ${
        loading && "animate-pulse"
      }`}
    >
      {loading ? "processing" : "confirm"}
    </button>
  );
};

export default BtnDelete;
