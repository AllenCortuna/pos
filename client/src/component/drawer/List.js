import React, { useEffect, useState } from "react";
import BtnDelete from "../utility/BtnDelete";
import BtnEdit from "../utility/BtnEdit";
import Btn from "../utility/Btn";
import BtnCancel from "../utility/BtnCancel";
import Table from "./Table";
import { drawerStore } from "../../zustand/drawer";
import Moment from "react-moment";
import { errNotify, warnNotify } from "../utility/alert";
import Filter from "../invoice/Filter";

const List = ({ setid, setshow }) => {
  const tr = "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ";
  const act =
    "px-6 py-4 text-sm font-medium text-gray-800 whitespace-wrap flex flex-rows gap-2";
  const drawers = drawerStore((state) => state.drawers);
  const loading = drawerStore((state) => state.loading);
  const total = drawerStore((state) => state.total);
  const getDrawer = drawerStore((state) => state.getDrawer);
  const getDailyTotal = drawerStore((state) => state.getDailyTotal);
  const deleteDrawer = drawerStore((state) => state.deleteDrawer);


  useEffect(() => {
    getDailyTotal();
  }, [getDailyTotal, drawers]);
  
  const [filter, setfilter] = useState({
    month: "",
    year: "",
  });
  const handleGetDrawer= () => {
    const regex = /^\d{4}$/;
    if (!filter.month) {
      alert("Select a month");
    } else if (!regex.test(filter.year)) {
      alert("Enter a valid year");
    } else {
      getDrawer(filter);
    }
  };

  const [remove, setremove] = useState(false);
  return (
    <div className="w-auto grid mx-auto">
      <Filter
        filter={filter}
        setfilter={setfilter}
        handleGetInvoice={handleGetDrawer}
      />
      <Table
        total={total}
        element={
          <>
            {drawers?.reverse().map((a, index) => (
              <tr key={a._id}>
                {/* <td className={tr}> {index+1} </td> */}
                <td className={tr}> {a.transactionNo}</td>
                <td className={tr}> {a.drawerNo}</td>
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
                        deleteDrawer(a._id,errNotify,warnNotify);
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
