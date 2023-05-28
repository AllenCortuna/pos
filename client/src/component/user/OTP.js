import React from "react";
import { userStore } from "../../zustand/user";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState(new Array(4).fill(""));

  const loading = userStore((state) => state.loading);
  const resetOTP = userStore((state) => state.resetOTP);

  const handleReset = () => {
    resetOTP(
      {
        otp: otp.join(""),
        password: JSON.parse(localStorage.getItem("resetPW"))?.password,
      },
      navigate
    );
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]); //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <span className=" flex h-screen w-screen">
      <form className="m-auto grid bg-white shadow-lg m-auto max-w-[23rem] min-w-[25rem] h-auto border-2 border-zinc-300 rounded-xl p-5">
        <h4 className="font-[600] text-zinc-600 text-xl drop-shadow-sm my-3 mx-auto">
          ENTER OTP
        </h4>
        <h4 className="mx-auto text-md text-zinc-600">
          Enter the code sent to your Email
        </h4>
        <div className="mx-auto my-10 flex justify-center flex-row gap-2">
          {otp.map((data, index) => {
            return (
              <input
                className="text-center font-[500] h-14 w-10 border border-zinc-800 rounded-md space-mono text-zinc-800 text-[2rem] m-1 focus:outline-none bg-white focus:border-cyan-800"
                type="number"
                name="otp"
                maxLength={"1"}
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </div>
        <span className="flex flex-wrap flex-row gap-10 justify-center mb-10 mx-auto w-full">
          <button onClick={() => setOtp([...otp.map(() => "")])}
          className="text-lg text-zinc-600 border-2 border-zinc-600 p-4 px-8 rounded-md"> clear</button>
          <button
            onClick={handleReset}
            disabled={loading}
            className={`p-4 px-6 text-lg bg-zinc-800 text-white rounded-md drop-shadow-md border-2 border-zinc-800 transiton-all duration-300 ease-linear hover:bg-zinc-500 ${
              loading && "animate-pulse"
            } `}
          >
            {loading ? "processing" : "submit"}
          </button>
        </span>
      </form>
    </span>
  );
};

export default OTP;
