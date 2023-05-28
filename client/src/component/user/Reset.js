import React, { useState } from "react";
import { userStore } from "../../zustand/user";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Reset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const reset = userStore((state) => state.reset);
  const loading = userStore((state) => state.loading);
  const [data, setdata] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
    if (data.password !== data.confirmPassword) {
      alert("Password not match");
    } else {
      reset(data, navigate);
    }
  };

  const input =
    "border-2 focus:border-cyan-800 border-zinc-300 text-zinc-500 font-[500] text-lg p-4 rounded-md w-full bg-none my-4 focus:outline-none focus:border-cyan-600";
  return (
    <div className="h-screen w-screen flex flex-col justify-center content-center">
      <form
        className="m-auto grid bg-white shadow-lg m-auto min-w-[23rem] max-w-[26rem] h-auto border-2 border-zinc-300 rounded-xl p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="font-semibold text-zinc-700 text-3xl text-center mb-5">
          Change Password
        </h4>

        <p className="text-lg text-zinc-600 mt-5 font-[500]">Email </p>
        <input
          type="email"
          className={input}
          {...register("email", { required: true })}
          onChange={handleChange}
        />

        <p className="text-lg text-zinc-600 mt-5 font-[500]">Password </p>
        <input
          type="password"
          className={input}
          {...register("password", { required: true, minLength: 8 })}
          onChange={handleChange}
        />

        <p className="text-lg text-zinc-600 mt-5 font-[500]">
          Confirm Password
        </p>
        <input
          type="password"
          className={input}
          {...register("confirmPassword", { required: true })}
          onChange={handleChange}
        />

        {errors.password && (
          <h4 className="text-rose-600 font-[500] text-lg mx-auto">
            Password must be 8 or more characters
          </h4>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`p-4 px-8 font-[500] text-md border-2 rounded-md bg-zinc-800 text-white mr-0 mt-8 m-auto ${
            loading && "animate-pulse"
          }`}
        >
          {loading ? "Processing" : "Next"}
        </button>
      </form>
    </div>
  );
};

export default Reset;
