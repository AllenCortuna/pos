import React from "react";
import { CashIcon } from "@heroicons/react/solid";
import { ShoppingCartIcon } from "@heroicons/react/solid";

const Tag = ({ handleChange, form }) => {
  const expense = form.tag === "expense";
  const profit = form.tag === "profit";

  // ICON
  const icon = "w-5 text-gray-400 inline mr-1";
  const iconActive = "w-5 text-gray-800 inline mr-1";
  // BUTTON
  const span = "border border-grey-500 rounded bg-none text-xs text-gray-400 p-1 px-2 mr-4";
  const spanActive = "border-2 rounded bg-primary text-xs text-black font-semibold p-1 px-3 mr-4 transition-all duration-300";
  const active = "border-2 rounded bg-orange text-xs text-black font-semibold p-1 px-3 mr-4 transition-all duration-300";

  return (
    <div className="">


      <button
        className={profit ? spanActive : span}
        value="profit"
        name="tag"
        onClick={handleChange}
      >
        <CashIcon className={expense ? icon : iconActive} /> profit
      </button>

      <button
        className={expense ? active : span}
        value="expense"
        name="tag"
        onClick={handleChange}
      >
        <ShoppingCartIcon className={profit ? icon : iconActive} /> expense
      </button>

    </div>
  );
};

export default Tag;
