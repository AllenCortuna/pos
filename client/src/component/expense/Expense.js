import React, { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import { expenseStore } from "../../zustand/expense";
import Layout from "../Layout";
// import autoAnimate from "@formkit/auto-animate";
import { ToastContainer } from "react-toastify";
import Loading from "../Loading";
import PagesTitle from "../utility/PagesTitle";
import { errNotify, okNotify } from "../utility/alert";

const Expense = () => {
  const expenses = expenseStore((state) => state.expenses);
  const loading = expenseStore((state) => state.loading);
  const updateExpense = expenseStore((state) => state.updateExpense);
  const uploadExpense = expenseStore((state) => state.uploadExpense);

  const [id, setid] = useState(0);
  const [list, setlist] = useState(null);
  const [show, setshow] = useState(false);
  const [data, setdata] = useState({
    date: "",
    quantity: "",
    amount: "",
    time: "",
  });

  // const dom = React.useRef(null);
  // useEffect(() => {
  //   dom.current && autoAnimate(dom.current);
  // }, [dom]);

  const clear = () => {
    setid(0);
    setlist(null);
    setdata({
      date: "",
      time: "",
      quantity: "",
      amount: "",
    });
  };

  useEffect(() => {
    setlist(id ? expenses.find((r) => r._id === id) : null);
  }, [expenses, id]);

  useEffect(() => {
    if (list) setdata(list);
  }, [id, list]);

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === 0) {
      if (
        data.date === "" ||
        data.time === "" ||
        data.quantity === "" ||
        data.amount === ""
      ) {
        errNotify("Complete Form input");
      } else {
        await uploadExpense(data,okNotify,errNotify);
        clear();
      }
    } else {
      await updateExpense(data, id,okNotify,errNotify);
      clear();
    }
  };

  return (
    <Layout
      element={
        // <div className="grid pt-20" ref={dom}>
        <div className="grid pt-20">
       <ToastContainer/> 
          <PagesTitle text={"expense"} />
          <button
            className="p-4 border-2 rounded-md text-white border-zinc-800 text-sm font-[400] bg-zinc-800 m-auto transition-all duration-300 ease-linear fixed right-10 bottom-10 z-50"
            onClick={() => {
              setshow(!show);
            }}
          >
            {show ? "close" : "Open Form"}
          </button>

          {show && (
            <Form
              currentId={id}
              data={data}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          )}
          {loading && <Loading />}
          <List setid={setid} setshow={setshow} />
          {expenses.length === 0 && <span className="text-[1.5rem] mt-5 mx-auto text-zinc-800">No data result based on your filter!</span>}
        </div>
      }
    />
  );
};

export default Expense;
