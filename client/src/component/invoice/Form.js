import React from "react";
import Input from "../utility/Input";
// import Date from "../utility/Date";
import { invoiceStore } from "../../zustand/invoice";
import Time from "../utility/Time";
import GoodId from "./GoodId";

const Form = ({ currentId, data, onChange, onSubmit }) => {
  const loading = invoiceStore((state) => state.loading);
  return (
    <span className=" z-30 fixed top-0 w-screen h-screen left-0 right-0 flex justify-center content-center bg-zinc-800/20 backdrop-blur-sm">
    <form className="w-[20rem] grid gap-2 h-auto p-4 place-content-start justify-items-center bg-white border rounded-lg m-auto shadow-md">
      <h4 className="text-md text-zinc-500 font-bold ml-2">
        {currentId ? "Update Invoice" : "Upload Invoice"}
      </h4>
      <hr className="text-zinc-400 " />
      <Input
        placeholder={"BIR No"}
        name={"birNo"}
        value={data.birNo}
        type={"text"}
        onChange={onChange}
      />
      <GoodId
        placeholder={"Good ID "}
        name={"goodID"}
        value={data.goodID }
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
