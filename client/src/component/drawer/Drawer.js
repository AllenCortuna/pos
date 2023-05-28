import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Form from "./Form";
import List from "./List";
import { drawerStore } from "../../zustand/drawer";
import Layout from "../Layout";
// import autoAnimate from "@formkit/auto-animate";
import Loading from "../Loading";
import PagesTitle from "../utility/PagesTitle";
import { errNotify, okNotify } from "../utility/alert";

const Drawer = () => {
  const drawers = drawerStore((state) => state.drawers);
  const loading = drawerStore((state) => state.loading);
  const updateDrawer = drawerStore((state) => state.updateDrawer);
  const uploadDrawer = drawerStore((state) => state.uploadDrawer);

  const [id, setid] = useState(0);
  const [list, setlist] = useState(null);
  const [show, setshow] = useState(false);
  const [data, setdata] = useState({
    date: "",
    quantity: "",
    time: "",
    amount: "",
    transactionNo: "",
    drawerNo: "",
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
      transactionNo: "",
      drawerNo: "",
    });
  };

  useEffect(() => {
    setlist(id ? drawers.find((r) => r._id === id) : null);
  }, [drawers, id]);

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
        data.quantity === "" ||
        data.amount === "" ||
        data.time === ""
      ) {
        errNotify("Complete Form input");
      } else {
        await uploadDrawer(data,okNotify,errNotify);
        clear();
      }
    } else {
      await updateDrawer(data, id, okNotify,errNotify);
      clear();
    }
  };

  return (
    <Layout
      element={
        // <div className="grid pt-20" ref={dom}>
        <div className="grid pt-20">
       <ToastContainer/> 
          <PagesTitle text={"Cash on Drawer"} />
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
          {drawers.length === 0 && <span className="text-[1.5rem] mt-5 mx-auto text-zinc-800">No data result based on your filter!</span>}
        </div>
      }
    />
  );
};

export default Drawer;
