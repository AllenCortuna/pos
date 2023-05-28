import React, { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import { goodStore } from "../../zustand/good";
import Layout from "../Layout";
// import autoAnimate from "@formkit/auto-animate";
import Loading from "../Loading";
import PagesTitle from "../utility/PagesTitle";
import { ToastContainer } from "react-toastify";
import { errNotify, okNotify } from "../utility/alert";

const Good = () => {
  const [id, setid] = useState(0);
  const [list, setlist] = useState(null);
  const [show, setshow] = useState(false);
  const [data, setdata] = useState({
    name: "",
    stock: "",
    type: "",
    unit: "",
    price: "",
  });

  // const dom = React.useRef(null);
  // useEffect(() => {
  //   dom.current && autoAnimate(dom.current);
  // }, [dom]);

  const clear = () => {
    setid(0);
    setlist(null);
    setdata({
      name: "",
      stock: "",
      type: "",
      unit: "",
      price: "",
    });
  };

  const goods = goodStore((state) => state.goods);
  const loading = goodStore((state) => state.loading);
  const updateGood = goodStore((state) => state.updateGood);
  const uploadGood = goodStore((state) => state.uploadGood);
  useEffect(() => {
    setlist(id ? goods.find((r) => r._id === id) : null);
  }, [goods, id]);

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
        data.name === "" ||
        data.unit === "" ||
        data.price === "" ||
        data.type === "" ||
        data.stock === ""
      ) {
        errNotify("Complete Form input");
      } else {
        await uploadGood(data,okNotify,errNotify);
        clear();
      }
    } else {
      await updateGood(data, id,okNotify,errNotify);
      clear();
    }
  };
  return (
    <Layout
      element={
        // <div className="grid pt-20" ref={dom}>
        <div className="grid pt-20" >
       <ToastContainer/> 
        <PagesTitle text={"Goods"}/>
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

export default Good;
