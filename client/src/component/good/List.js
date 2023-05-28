import React, { useEffect, useState } from "react";
import BtnDelete from "../utility/BtnDelete";
import BtnEdit from "../utility/BtnEdit";
import Btn from "../utility/Btn";
import BtnCancel from "../utility/BtnCancel";
import Table from "./Table";
import { goodStore } from "../../zustand/good";
import { errNotify, warnNotify } from "../utility/alert";

const List = ({ setid, setshow }) => {
  const tr = "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap";
  const act =
    "px-6 py-4 text-sm font-medium text-gray-800 whitespace-wrap flex flex-rows gap-2";
  const list = goodStore((state) => state.goods);
  const loading = goodStore((state) => state.loading);
  const getGood = goodStore((state) => state.getGood);
  const deleteGood = goodStore((state) => state.deleteGood);

  useEffect(() => {
    getGood();
  }, [getGood]);

  const [remove, setremove] = useState(false);
  return (
    <div className="w-auto grid mx-auto">
      <Table
        element={
          <>
            {list?.reverse().map((a, index) => (
              <tr key={a._id}>
                <td className={tr}> {a._id} </td>
                <td className={tr}> {a.name} </td>
                <td className={tr}> {a.type} </td>
                <td className={tr}> {a.stock} </td>
                <td className={tr}> {a.unit} </td>
                <td className={tr}> {a.price} </td>
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
                        deleteGood(a._id,errNotify,warnNotify);
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
