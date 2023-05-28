import React,{useEffect} from 'react'
import BtnDelete from "../utility/BtnDelete";
import BtnEdit from "../utility/BtnEdit";
import  Table  from "./Table";
import { outgoingStore } from "../../zustand/outgoing";
import Moment from 'react-moment';


const List = ({setid,setshow}) => {
  
  const tr = "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ";
  const act =
    "px-6 py-4 text-sm font-medium text-gray-800 whitespace-wrap flex flex-rows gap-2";
  const list = outgoingStore((state) => state.outgoings);
  const loading = outgoingStore((state) => state.loading);
  const getOutgoing = outgoingStore((state) => state.getOutgoing);
  const deleteOutgoing = outgoingStore((state) => state.deleteOutgoing);
  

  useEffect(() => {
    getOutgoing();
  }, [getOutgoing]);

  return (
    <div className='w-auto grid mx-auto' >
      <Table
        element={
          <>
            {list?.reverse().map((a, index) => (
              <tr key={a._id}>
                <td className={tr}> {index + 1} </td>
                <td className={tr}> <Moment date={a.outdate} format="MMM-DD-YYYY"/> </td>
                <td className={tr}> {a.customer} </td>
                <td className={tr}> {a.discount} </td>
                <td className={tr}> {a.subtotal} </td>
                <td className={tr}> {a.total} </td>
                <td className={tr}> {a._id} </td>
                <td className={act}>
                  <BtnEdit
                    loading={loading}
                    onClick={() => {
                      setid(a._id);
                      setshow(true);
                      window.scroll(0,0);
                    }}
                  />
                  <BtnDelete
                    loading={loading}
                    onClick={() => {
                      deleteOutgoing(a._id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </>
        }
      />
    </div>
  )
}

export default List
