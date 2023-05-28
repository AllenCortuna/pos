import React, { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import { outgoingStore } from "../../zustand/outgoing";
import Layout from "../Layout";
import autoAnimate from "@formkit/auto-animate";
import Loading from "../Loading";

const Outgoing = () => {
  const [id, setid] = useState(0);
  const [list, setlist] = useState(null);
  const [show, setshow] = useState(false);
  const [data, setdata] = useState({
    outdate: "",
    customer: "",
    discount: "",
    subtotal: "",
    total: "",
  });

  const dom = React.useRef(null);
  useEffect(() => {
    dom.current && autoAnimate(dom.current);
  }, [dom]);

  const clear = () => {
    setid(0);
    setlist(null);
    setdata({
      outdate: "",
      customer: "",
      discount: "",
      subtotal: "",
      total: "",
    });
  };

  const outgoings = outgoingStore((state) => state.outgoings);
  const loading = outgoingStore((state) => state.loading);
  const updateOutgoing = outgoingStore((state) => state.updateOutgoing);
  const uploadOutgoing = outgoingStore((state) => state.uploadOutgoing);
  useEffect(() => {
    setlist(id ? outgoings.find((r) => r._id === id) : null);
  }, [outgoings, id]);

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
        data.outdate === "" ||
        data.customer === "" ||
        data.discount === "" ||
        data.subtotal === "" ||
        data.total === ""
      ) {
        alert("Complete Form input");
      } else {
        await uploadOutgoing(data);
        clear();
      }
    } else {
      await updateOutgoing(data, id);
      clear();
    }
  };
  return (
    <Layout
      element={
        <div className="grid pt-20" ref={dom}>
          <button
            className="p-4 border-2 rounded-md text-white border-zinc-800 text-sm font-[400] bg-zinc-800 m-auto transition-all duration-300 ease-linear"
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

export default Outgoing;
