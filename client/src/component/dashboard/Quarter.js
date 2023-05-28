import React, { useEffect } from "react";
import { totalStore } from "../../zustand/total";

const Quarter = () => {
  const total = totalStore((state)=> state.total)
  const getTotal = totalStore((state)=> state.getTotal)
  useEffect(()=>{
    getTotal()
  },[getTotal])
  
  return (
    <span className="flex flex-wrap flex-1 flex-row md:justify-between content-start grid-cols-4 gap-5 w-full h-auto">
      <Content name={"Total Goods"} value={total.good} border={"border-cyan-600"} />
      <Content name={"Total Suppliers"} value={total.supplier} border={"border-amber-600"} />
      <Content name={"Stocks of Goods"} value={total.stock} border={"border-violet-400"} />
      <Content name={"Total Earnings"} value={total.earning} border={"border-rose-500"} />
    </span>
  );
};

export default Quarter;

export const Content = ({ name, value, border }) => {
  return (
    <span className={`flex justify-start content-between border-l-8 bg-white md:bg-zinc-100 h-20 w-40 shad rounded-lg p-4 text-md font-bold text-zinc-600 ${border}`}>
      <span className="grid gap-2">
        <h4 className="text-zinc-500 font-[500] rale text-sm w-full whitespace-wrap">{name}</h4>
        <p>{value}</p>
      </span>
    </span>
  );
};
