import React,{useEffect} from 'react'
import BtnDelete from "../utility/BtnDelete";
import BtnEdit from "../utility/BtnEdit";
import  Table  from "./Table";
import { supplierStore } from "../../zustand/supplier";


const List = ({setid,setshow}) => {
  
  const tr = "px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ";
  const act =
    "px-6 py-4 text-sm font-medium text-gray-800 whitespace-wrap flex flex-rows gap-2";
  const suppliers = supplierStore((state) => state.suppliers);
  const loading = supplierStore((state) => state.loading);
  const getSupplier = supplierStore((state) => state.getSupplier);
  const deleteSupplier = supplierStore((state) => state.deleteSupplier);
  

  useEffect(() => {
    getSupplier();
  }, [getSupplier]);

  return (
    <div className='w-auto grid mx-auto' >
      <Table
        element={
          <>
            {suppliers?.reverse().map((a, index) => (
              <tr key={a._id}>
                <td className={tr}> {index + 1} </td>
                <td className={tr}> {a.name} </td>
                <td className={tr}> {a.contact} </td>
                <td className={tr}> {a.address} </td>
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
                      deleteSupplier(a._id);
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
