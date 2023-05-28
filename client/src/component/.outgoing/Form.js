import React from "react";
import Input from "../utility/Input";
import Date from "../utility/Date";
import { outgoingStore } from "../../zustand/outgoing";

const Form = ({ currentId, data, onChange, onSubmit }) => {
  const loading = outgoingStore((state) => state.loading);
  return (
    <form className="w-[20rem] grid gap-2 h-auto p-4 place-content-start bg-white border rounded-lg mx-auto shadow-md">
      <h4 className="text-md text-zinc-500 font-bold ml-2">
        {currentId ? "Update Outgoing" : "Upload Outgoing"}
      </h4>
      <hr className="text-zinc-400 " />
      <Date
        placeholder={"Out-Date"}
        name={"outdate"}
        value={data.outdate}
        onChange={onChange}
      />
      <Input
        placeholder={"Costumer"}
        name={"customer"}
        value={data.customer}
        type={"text"}
        onChange={onChange}
      />
      <Input
        placeholder={"Discount"}
        name={"discount"}
        value={data.discount}
        type={"number"}
        onChange={onChange}
      />
      <Input
        placeholder={"Subtotal"}
        name={"subtotal"}
        value={data.subtotal}
        type={"number"}
        onChange={onChange}
      />
      <Input
        placeholder={"Total"}
        name={"total"}
        value={data.total}
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
  );
};

export default Form;
