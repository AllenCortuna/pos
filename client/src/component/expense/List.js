import React, { useEffect, useState } from "react";
import BtnDelete from "../utility/BtnDelete";
import BtnEdit from "../utility/BtnEdit";
import Btn from "../utility/Btn";
import BtnCancel from "../utility/BtnCancel";
import Table from "./Table";
import { expenseStore } from "../../zustand/expense";
import Moment from "react-moment";
import { errNotify, okNotify } from "../utility/alert";
import Filter from "../invoice/Filter";

const List = ({ setid, setshow }) => {
  const tr = "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ";
  const act =
    "px-6 py-4 text-sm font-medium text-gray-800 whitespace-wrap flex flex-rows gap-2";
  const expenses = expenseStore((state) => state.expenses);
  const loading = expenseStore((state) => state.loading);
  const total = expenseStore((state) => state.total);
  const getExpense = expenseStore((state) => state.getExpense);
  const getDailyTotal = expenseStore((state) => state.getDailyTotal);
  const deleteExpense = expenseStore((state) => state.deleteExpense);
  
  const [filter, setfilter] = useState({
    month: "",
    year: "",
  });
  
  const handleGetExpense = () => {
    const regex = /^\d{4}$/;
    if (!filter.month) {
      alert("Select a month");
    } else if (!regex.test(filter.year)) {
      alert("Enter a valid year");
    } else {
      getExpense(filter);
    }
  };


  useEffect(() => {
    getDailyTotal();
  }, [getDailyTotal, expenses]);
  
  const [remove, setremove] = useState(false);
  return (
    <div className="w-auto grid mx-auto">
      <Filter
        filter={filter}
        setfilter={setfilter}
        handleGetInvoice={handleGetExpense}
      />
      <Table
        total={total}
        element={
          <>
            {expenses?.reverse().map((a, index) => (
              <tr key={a._id}>
                {/* <td className={tr}> {index + 1} </td> */}
                {/* <td className={tr}> {index+1} </td> */}
                <td className={tr}> {index+ 1}</td>
                <td className={tr}>
                  <Moment date={a.date} format="MMM-DD-YYYY" />
                </td>
                <td className={tr}>{a.time}</td>
                <td className={tr}> {a.quantity} </td>
                <td className={tr}> {a.amount} </td>
                <td className={act}>
                  {remove ? (
                    <BtnCancel
                      loading={loading}
                      onClick={() => {
                        setremove(false);
                      }}
                    />
                  ) : (
                    <BtnEdit
                      loading={loading}
                      onClick={() => {
                        setid(a._id);
                        setshow(true);
                        window.scroll(0, 0);
                      }}
                    />
                  )}
                  {remove ? (
                    <BtnDelete
                      loading={loading}
                      onClick={() => {
                        deleteExpense(a._id,errNotify,okNotify);
                        setremove(false);
                      }}
                    />
                  ) : (
                    <Btn
                      loading={loading}
                      onClick={() => {
                        setremove(true);
                      }}
                    />
                  )}
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
