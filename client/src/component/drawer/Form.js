import React from "react";
import Input from "../utility/Input";
import Date from "../utility/Date";
import { invoiceStore } from "../../zustand/invoice";
import Time from "../utility/Time";

const Form = ({ currentId, data, onChange, onSubmit }) => {
  const loading = invoiceStore((state) => state.loading);
  return (
    <span className=" z-30 fixed top-0 w-screen h-screen left-0 right-0 flex justify-center content-center bg-zinc-800/20 backdrop-blur-sm">
    <form className="w-[20rem] grid gap-2 h-auto p-4 place-content-start justify-items-center bg-white border rounded-lg m-auto shadow-md">
      <h4 className="text-md text-zinc-500 font-bold ml-2">
        {currentId ? "Update Drawer" : "Upload Drawer"}
      </h4>
      <hr className="text-zinc-400 " />
      <Input
        placeholder={"Transaction No"}
        name={"transactionNo"}
        value={data.transactionNo}
        type={"number"}
        onChange={onChange}
      />
      <Input
        placeholder={"Invoice No"}
        name={"drawerNo"}
        value={data.drawerNo}
        type={"number"}
        onChange={onChange}
      />
      <Date
        placeholder={"Date"}
        name={"date"}
        value={data.date}
        onChange={onChange}
      />
      <Time
        placeholder={"Time"}
        name={"time"}
        value={data.time }
        onChange={onChange}
      />
      <Input
        placeholder={"Quantity"}
        name={"quantity"}
        value={data.quantity}
        type={"number"}
        onChange={onChange}
      />
      <Input
        placeholder={"Amount"}
        name={"amount"}
        value={data.amount}
        type={"number"}
        onChange={onChange}
      />
      <button
        type="submit"
        disabled={loading}
        className={`p-3 px-4 font-[500] text-md border-2 rounded-md bg-zinc-800 mt-3 text-white mr-0 m-auto ${
          loading && "animate-pulse"
        }`}
        onClick={onSubmit}
      >
        {loading ? "Processing" : "Submit"}
      </button>
    </form>
    </span>
  );
};

export default Form;
