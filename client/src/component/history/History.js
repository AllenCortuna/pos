import React, { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import { historyStore } from "../../zustand/history";
import Layout from "../Layout";
import Loading from "../Loading";
import PagesTitle from "../utility/PagesTitle";
import { ToastContainer } from "react-toastify";
import { errNotify, okNotify } from "../utility/alert";

const History = () => {
  const [id, setid] = useState(0);
  const [list, setlist] = useState(null);
  const [show, setshow] = useState(false);
  const [data, setdata] = useState({
    date: "",
    supplier: "",
    name: "",
    productName: "",
    unit: "",
    type: "",
    quantity: "",
  });

  const clear = () => {
    setid(0);
    setlist(null);
    setdata({
      date: "",
      supplier: "",
      name: "",
      productName: "",
      unit: "",
      type: "",
      quantity: "",
    });
  };

  const historys = historyStore((state) => state.historys);
  const loading = historyStore((state) => state.loading);
  const updateHistory = historyStore((state) => state.updateHistory);
  const uploadHistory = historyStore((state) => state.uploadHistory);
  useEffect(() => {
    setlist(id ? historys.find((r) => r._id === id) : null);
  }, [historys, id]);

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
        data.supplier === "" ||
        data.name === "" ||
        data.productName === "" ||
        data.unit === "" ||
        data.type === "" ||
        data.quantity === ""
      ) {
        errNotify("Complete Form input");
      } else {
        await uploadHistory(data, okNotify, errNotify);
        clear();
      }
    } else {
      await updateHistory(data, id, okNotify, errNotify);
      clear();
    }
  };
  return (
    <Layout
      element={
        <div className="grid pt-20">
          <ToastContainer />
          <PagesTitle text={"history"} />
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
        </div>
      }
    />
  );
};

export default History;
