import React, { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import { incomingStore } from "../../zustand/incoming";
import Layout from "../Layout";
import Loading from "../Loading";
import PagesTitle from "../utility/PagesTitle";
import { ToastContainer } from "react-toastify";
import { errNotify, okNotify } from "../utility/alert";

const Incoming = () => {
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

  const incomings = incomingStore((state) => state.incomings);
  const loading = incomingStore((state) => state.loading);
  const updateIncoming = incomingStore((state) => state.updateIncoming);
  const uploadIncoming = incomingStore((state) => state.uploadIncoming);
  useEffect(() => {
    setlist(id ? incomings.find((r) => r._id === id) : null);
  }, [incomings, id]);

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
        await uploadIncoming(data, okNotify, errNotify);
        clear();
      }
    } else {
      await updateIncoming(data, id, okNotify, errNotify);
      clear();
    }
  };
  return (
    <Layout
      element={
        <div className="grid pt-20">
          <ToastContainer />
          <PagesTitle text={"incoming"} />
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

export default Incoming;
