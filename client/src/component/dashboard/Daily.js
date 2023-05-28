import React, { useEffect, useState } from "react";
import { drawerStore } from "../../zustand/drawer";
import { expenseStore } from "../../zustand/expense";
import { invoiceStore } from "../../zustand/invoice";

const Daily = () => {
  const invoice = invoiceStore((state) => state.total);
  const drawer = drawerStore((state) => state.total);
  const expense = expenseStore((state) => state.total);

  const getDrawer = drawerStore((state) => state.getDailyTotal);
  const getInvoice = invoiceStore((state) => state.getDailyTotal);
  const getExpense = expenseStore((state) => state.getDailyTotal);

  const [onhand, setonhand] = useState(0);
  const [gain, setgain] = useState(0);

  useEffect(() => {
    getDrawer();
    getInvoice();
    getExpense();
  }, [getDrawer, getExpense, getInvoice]);

  useEffect(() => {
    setgain(parseInt(invoice) + parseInt(drawer) - expense - onhand);
  }, [drawer, onhand, expense, invoice]);

  return (
    <div>
      <span className="flex flex-row justify-apart gap-5 gap-y-2 flex-wrap border shadow-lg rounded-xl relative mt-5 pt-5">
    <p className="absolute left-5 -top-4 bg-zinc-700 text-white font-bold uppercase rounded-lg p-1 px-4 shadow-lg">Daily Report</p>
        <Content
          border={"border-amber-800"}
          name={"Gross Income"}
          value={invoice?.toFixed(2)}
        />
        <Content
          border={"border-cyan-800"}
          name={"Drawer Cash"}
          value={drawer?.toFixed(2)}
        />
        <Content
          border={"border-slate-800"}
          name={"Expenses"}
          value={expense?.toFixed(2)}
        />
        <Input
          border={"border-yellow-800"}
          name={"Net Income"}
          value={onhand?.toFixed(2)}
          onChange={(e) => setonhand(e.target.value)}
        />
        <Content
          border={gain <= 0 ? "border-rose-800 " : "border-green "}
          name={gain <= 0 ? "Daily Deficiet" : "Daily Gain"}
          value={gain?.toFixed(2)}
        />
      </span>
    </div>
  );
};

export default Daily;

export const Content = ({ name, value, border }) => {
  return (
    <span
      className={`flex justify-start content-between border-l-[.8rem] border bg-zinc-100 h-20 my-4 ml-2 w-36 shad rounded-lg p-4 text-md font-bold text-zinc-600 ${border}`}
    >
      <span className="grid gap-2">
        <h4 className="text-zinc-500 font-[500] rale text-sm w-full whitespace-wrap">
          {name}
        </h4>
        <p>{value}</p>
      </span>
    </span>
  );
};

export const Input = ({ name, value, border, onChange }) => {
  return (
    <span
      className={`flex justify-start content-between border-l-[.8rem] border bg-zinc-100 h-20 my-4 ml-2 w-36 shad rounded-lg p-4 px-2 text-md font-bold text-zinc-600 ${border}`}
    >
      <span className="grid gap-2">
        <h4 className="text-zinc-500 font-[500] rale text-sm w-full whitespace-wrap">
          {name}
        </h4>
        <input
          value={value}
          type="number"
          onChange={onChange}
          className="border border-zinc-300 bg-none w-28 px-2"
        />
      </span>
    </span>
  );
};
