import React, { useEffect } from "react";
import BtnDelete from "../utility/BtnDelete";
import BtnEdit from "../utility/BtnEdit";
import Table from "./Table";
import { saleStore } from "../../zustand/sale";
import Moment from "react-moment";

const List = ({ setid, setshow }) => {
  const tr = "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ";
  const act =
    "px-6 py-4 text-sm font-medium text-gray-800 whitespace-wrap flex flex-rows gap-2";
  const sales = saleStore((state) => state.sales);
  const loading = saleStore((state) => state.loading);
  const total = saleStore((state) => state.total);
  const getSale = saleStore((state) => state.getSale);
  const getDailyTotal = saleStore((state) => state.getDailyTotal);
  const deleteSale = saleStore((state) => state.deleteSale);

  useEffect(() => {
    getSale();
  }, [getSale]);

  useEffect(() => {
    getDailyTotal();
  }, [getDailyTotal, sales]);
  console.log("total",total);
  return (
    <div className="w-auto grid mx-auto">
      <Table
        total={total}
        element={
          <>
            {sales?.reverse().map((a, index) => (
              <tr key={a._id}>
                {/* <td className={tr}> {index + 1} </td> */}
                {/* <td className={tr}> {index+1} </td> */}
                <td className={tr}>{a.transactionNo}</td>
                <td className={tr}>{a.saleNo}</td>
                <td className={tr}>
                  <Moment date={a.date} format="MMM-DD-YYYY" />
                </td>
                <td className={tr}>{a.time}</td>
                <td className={tr}> {a.quantity} </td>
                <td className={tr}> {a.amount} </td>
                <td className={act}>
                  <BtnEdit
                    loading={loading}
                    onClick={() => {
                      setid(a._id);
                      setshow(true);
                      window.scroll(0, 0);
                    }}
                  />
                  <BtnDelete
                    loading={loading}
                    onClick={() => {
                      deleteSale(a._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </>
        }
      />
    </div>
  );
};

export default List;
