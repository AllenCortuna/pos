import React, { useEffect } from "react";
import { goodStore } from "../../zustand/good";

const GoodId = ({ placeholder, value, name, onChange }) => {
  const goods = goodStore((state) => state.goods);
  const getGood = goodStore((state) => state.getGood);
  const loading = goodStore((state) => state.loading);

  useEffect(() => {
    getGood();
  }, [getGood]);

  return (
    <select
      className="border-2 text-sm p-3 text-zinc-500 mx-auto w-full font-[500] focus:outline-none focus:border-zinc-500 border-zinc-300 rounded-md "
      disabled={loading}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    >
    <option value="">Good ID</option>
      {goods.map((a) => (
        <option value={a._id}>{`${a.name}/${a._id}`}</option>
      ))}
    </select>
  );
};

export default GoodId;
