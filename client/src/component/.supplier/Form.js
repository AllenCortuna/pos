import React from "react";
import Input from "../utility/Input";
import { supplierStore } from "../../zustand/supplier";

const Form = ({ currentId, data, onChange, onSubmit }) => {
  const loading = supplierStore((state) => state.loading);
  return (
    <form className="w-[20rem] grid gap-2 h-auto p-4 place-content-start bg-white border rounded-lg mx-auto shadow-md">
      <h4 className="text-md text-zinc-500 font-bold ml-2">
        {currentId ? "Update Supplier" : "Upload Supplier"}
      </h4>
      <hr className="text-zinc-400 " />
      <Input
        placeholder={"Name"}
        name={"name"}
        value={data.name}
        type={"text"}
        onChange={onChange}
      />
      <Input
        placeholder={"Contact"}
        name={"contact"}
        value={data.contact}
        type={"number"}
        onChange={onChange}
      />
      <Input
        placeholder={"Address"}
        name={"address"}
        value={data.address}
        type={"text"}
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
  );
};

export default Form;
