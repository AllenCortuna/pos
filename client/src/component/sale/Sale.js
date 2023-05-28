import React, { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import { saleStore } from "../../zustand/sale";
import Layout from "../Layout";
// import autoAnimate from "@formkit/auto-animate";
import Loading from "../Loading";
import PagesTitle from "../utility/PagesTitle";

const Sale = () => {
  const sales = saleStore((state) => state.sales);
  const loading = saleStore((state) => state.loading);
  const updateSale = saleStore((state) => state.updateSale);
  const uploadSale = saleStore((state) => state.uploadSale);

  const [id, setid] = useState(0);
  const [list, setlist] = useState(null);
  const [show, setshow] = useState(false);
  const [data, setdata] = useState({
    transactionNo : "",
    saleNo: "", 
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
    transactionNo : "",
    saleNo: "", 
      date: "",
      time: "",
      quantity: "",
      amount: "",
    });
  };

  useEffect(() => {
    setlist(id ? sales.find((r) => r._id === id) : null);
  }, [sales, id]);

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
        data.transactionNo === "" ||
        data.saleNo === "" ||
        data.date === "" ||
        data.time === "" ||
        data.quantity === "" ||
        data.amount === ""
      ) {
        alert("Complete Form input");
      } else {
        await uploadSale(data);
        clear();
      }
    } else {
      await updateSale(data, id);
      clear();
    }
  };

  return (
    <Layout
      element={
        // <div className="grid pt-20" ref={dom}>
        <div className="grid pt-20">
          <PagesTitle text={"sale"} />
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

export default Sale;
