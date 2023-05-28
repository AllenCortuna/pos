import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const Table = ({ element}) => {
  let componentRef = useRef();
  const th = "px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase";
  return (
    <div className=" bg-white shadow-md rounded-md flex flex-col mt-10 mx-auto p-2 w-auto">
      <ReactToPrint
        trigger={() => (
          <button className="p-4 border-2 rounded-md text-white border-zinc-700 text-sm font-[600] bg-zinc-700 mt-4 mr-2 mb-4 m-auto transition-all duration-300 ease-linear">
            Print this out!
          </button>
        )}
        content={() => componentRef}
      />

      <span ref={(el) => (componentRef = el)}>

        <div className="overflow-x-scroll">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-x-scroll border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className={th}>
                      Transaction No
                    </th>
                    <th scope="col" className={th}>
                      Invoice No
                    </th>
                    <th scope="col" className={th}>
                      BIR No
                    </th>
                    <th scope="col" className={th}>
                      Date
                    </th>
                    <th scope="col" className={th}>
                      Time
                    </th>
                    <th scope="col" className={th}>
                      Quantity
                    </th>
                    <th scope="col" className={th}>
                      Amount
                    </th>
                    <th scope="col" className={th}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">{element}</tbody>
              </table>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default Table;
