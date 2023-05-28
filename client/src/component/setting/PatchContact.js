import React, { useState } from "react";
import Input from "../utility/Input";
import Layout from "../Layout";
import { MdPermContactCalendar } from "react-icons/md";
import { patchStore } from "../../zustand/patch";
import { useNavigate } from "react-router-dom";

const PatchContact = () => {
  const [data, setdata] = useState({
    contact: "",
  });

  const loading = patchStore((state) => state.loading);
  const patchContact = patchStore((state) => state.patchContact);
  const navigate = useNavigate()

  return (
    <Layout
      element={
        <form className="w-[22rem] grid gap-2 h-auto p-5 place-content-start bg-white border rounded-lg mx-auto shadow-md">
          <h4 className="text-2xl text-zinc-600 font-[700] flex flex-row gap-2 mb-2">
            <span className="text-[2.5rem] inline">
              <MdPermContactCalendar />
            </span>
            Change Contact
          </h4>
          <Input
            placeholder={"New Contact"}
            type={"number"}
            value={data.contact}
            onChange={(e) => {
              setdata({ contact: e.target.value });
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className={`p-3 px-4 font-[500] text-md border-2 rounded-md bg-zinc-800 mt-3 text-white mr-0 m-auto ${
              loading && "animate-pulse"
            }`}
            onClick={() => patchContact(data,navigate)}
          >
            {loading ? "Processing" : "Submit"}
          </button>
        </form>
      }
    />
  );
};

export default PatchContact;
