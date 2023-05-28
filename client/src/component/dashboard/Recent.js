import React, { useEffect } from "react";
import Table from "./Table";
// import Moment from "react-moment";
import { goodStore } from "../../zustand/good";
import MinTable from "./MinTable";

const Recent = () => {
  const getRecentGood = goodStore((state) => state.getRecentGood);
  const getMinimum = goodStore((state) => state.getMinimum);

  const recent = goodStore((state) => state.recent);
  const minimum = goodStore((state) => state.minimum);
  useEffect(() => {
    getRecentGood();
    getMinimum();
  }, [getMinimum, getRecentGood]);

  const tr =
    "p-2 text-xs font-medium text-gray-600 whitespace-wrap truncate capitalize ";
  return (
    <div className="p-3 rounded-lg bg-white h-auto w-full shad border flex flex-1 flex-col gap-4 content-start">
      <Table
        element={
          <>
            {recent?.map((a) => (
              <tr key={a._id}>
                <td className={tr}>
                  {/* <Moment date={a.date} format="MMM-DD-YYYY" /> */}
              {a.type}
                </td>
                <td className={tr}> {a.name} </td>
                <td className={tr}>{a.stock}</td>
                <td className={tr}>
                  <p className="lowercase">{a.unit}</p>
                </td>
              </tr>
            ))}
          </>
        }
      />
      <MinTable
        element={
          <>
            <tr key={minimum._id}>
              <td className={tr}>{minimum?.name}</td>
              <td className={tr}> {minimum?.stock}</td>
              <td className={tr}> <p className="lowercase">{minimum?.unit}</p></td>
              <td className={tr}>
                {/* <Moment date={minimum?.date} format="MMM-DD-YYYY" /> */}
              {minimum?.type}
              </td>
            </tr>
          </>
        }
      />
    </div>
  );
};

export default Recent;
