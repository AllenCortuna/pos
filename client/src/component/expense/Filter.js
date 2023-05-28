import React from "react";

const Filter = ({ filter, setfilter, handleGetInvoice }) => {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  return (
    <div className="flex justify-start gap-4 content-start flex-row">
      <select
        className={
          "text-center w-40 border-2 rounded-lg p-4 bg-white text-zinc-500 capitalize"
        }
        value={filter.month}
        onChange={(e) => {
          setfilter({ ...filter, month: e.target.value });
        }}
      >
        <option value="">Select month</option>
        {months.map((mon, index) => (
          <option value={index}>{mon}</option>
        ))}
      </select>

      <input
        className={
          "text-center w-40 border-2 rounded-lg p-4 bg-white text-zinc-500 capitalize"
        }
        value={filter.year}
        placeholder="enter year"
        onChange={(e) => {
          setfilter({ ...filter, year: e.target.value });
        }}
      />
      <button
        type="button"
        className="p-3 rounded-lg bg-zinc-800 text-white w-28"
        onClick={handleGetInvoice}
      >
        Send
      </button>
    </div>
  );
};

export default Filter;
