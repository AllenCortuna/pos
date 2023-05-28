import React, { useEffect, useState } from "react";
import BtnDelete from "../utility/BtnDelete";
import Btn from "../utility/Btn";
import BtnCancel from "../utility/BtnCancel";
import Table from "./Table";
import { historyStore } from "../../zustand/history";
import Moment from "react-moment";
import { errNotify, warnNotify } from "../utility/alert";

const List = ({ setid, setshow }) => {
  const tr = "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ";
  const act =
    "px-6 py-4 text-sm font-medium text-gray-800 whitespace-wrap flex flex-rows gap-2";
  const historys = historyStore((state) => state.historys);
  const loading = historyStore((state) => state.loading);
  const getHistory = historyStore((state) => state.getHistory);
  const deleteHistory = historyStore((state) => state.deleteHistory);

  useEffect(() => {
    getHistory();
  }, [getHistory]);
  const [remove, setremove] = useState(false);

  return (
    <div className="w-auto grid mx-auto">
      <Table
        element={
          <>
            {historys?.reverse().map((a, index) => (
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
                    null
                  )}
                  {remove ? (
                    <BtnDelete
                      loading={loading}
                      onClick={() => {
                        deleteHistory(a._id, errNotify, warnNotify);
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
