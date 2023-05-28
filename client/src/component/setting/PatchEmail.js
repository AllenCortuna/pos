import React, { useState } from "react";
import Input from "../utility/Input";
import Layout from "../Layout";
import { MdAttachEmail } from "react-icons/md";
import { patchStore } from "../../zustand/patch";
import { useNavigate } from "react-router-dom";

const PatchEmail = () => {
  const [data, setdata] = useState({
    email: "",
    confirmEmail: "",
  });

  const loading = patchStore((state) => state.loading);
  const patchEmail = patchStore((state) => state.patchEmail);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    if (data.email !== data.confirmEmail) {
      alert("Email not Match!");
    } else {
      patchEmail(data, navigate);
    }
  };
  return (
    <Layout
      element={
        <form className="w-[22rem] grid gap-2 h-auto p-5 place-content-start bg-white border rounded-lg mx-auto shadow-md">
          <h4 className="text-2xl text-zinc-600 font-[700] flex flex-row gap-2 mb-2">
            <span className="text-[2.5rem] inline">
              <MdAttachEmail />
            </span>
            Change Email
          </h4>
          <Input
            placeholder={"New Email"}
            type={"email"}
            value={data.email}
            onChange={(e) => {
              setdata({ ...data, email: e.target.value });
            }}
          />
          <Input
            placeholder={"Confirm Email"}
            type={"email"}
            value={data.confirmEmail}
            onChange={(e) => {
              setdata({ ...data, confirmEmail: e.target.value });
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className={`p-3 px-4 font-[500] text-md border-2 rounded-md bg-zinc-800 mt-3 text-white mr-0 m-auto ${
              loading && "animate-pulse"
            }`}
            onClick={handleSubmit}
          >
            {loading ? "Processing" : "Submit"}
          </button>
        </form>
      }
    />
  );
};

export default PatchEmail;
