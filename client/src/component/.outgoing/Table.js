
const Table = ({ element }) => {
  const th = "px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase";
  return (
    <div className=" bg-white shadow-md rounded-md flex flex-col mt-10 mx-auto p-2 w-auto">
      <div className="overflow-x-scroll">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-x-scroll border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className={th}>
                    #
                  </th>
                  <th scope="col" className={th}>
                    Out-Date
                  </th>
                  <th scope="col" className={th}>
                    Customer
                  </th>
                  <th scope="col" className={th}>
                    Discount
                  </th>
                  <th scope="col" className={th}>
                    Subtotal
                  </th>
                  <th scope="col" className={th}>
                    Total
                  </th>
                  <th scope="col" className={th}>
                    ID
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
    </div>
  );
};

export default Table
