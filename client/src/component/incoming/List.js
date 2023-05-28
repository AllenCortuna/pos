import React, { useEffect, useState } from "react";
import BtnDelete from "../utility/BtnDelete";
import BtnEdit from "../utility/BtnEdit";
import Btn from "../utility/Btn";
import BtnCancel from "../utility/BtnCancel";
import Table from "./Table";
import { incomingStore } from "../../zustand/incoming";
import Moment from "react-moment";
import { errNotify, warnNotify } from "../utility/alert";

const List = ({ setid, setshow }) => {
  const tr = "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ";
  const act =
    "px-6 py-4 text-sm font-medium text-gray-800 whitespace-wrap flex flex-rows gap-2";
  const incomings = incomingStore((state) => state.incomings);
  const loading = incomingStore((state) => state.loading);
  const getIncoming = incomingStore((state) => state.getIncoming);
  const deleteIncoming = incomingStore((state) => state.deleteIncoming);

  useEffect(() => {
    getIncoming();
  }, [getIncoming]);
  const [remove, setremove] = useState(false);

  return (
    <div className="w-auto grid mx-auto">
      <Table
        element={
          <>
            {incomings?.reverse().map((a, index) => (
              <tr key={a._id}>
                <td className={tr}> {index + 1} </td>
                <td className={tr}>
                  {" "}
                  <Moment date={a.date} format="MMM-DD-YYYY" />{" "}
                </td>
                <td className={tr}> {a.supplier} </td>
                <td className={tr}> {a.name} </td>
                <td className={tr}> {a.productName} </td>
                <td className={tr}> {a.type} </td>
                <td className={tr}> {a.unit} </td>
                <td className={tr}> {a.quantity} </td>
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
                        deleteIncoming(a._id, errNotify, warnNotify);
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
