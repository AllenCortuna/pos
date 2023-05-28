
const Table = ({ element }) => {
  const th = "p-2 text-xs font-bold text-left text-zinc-500 uppercase";
  return (
    <div className=" bg-white shadow-md rounded-md flex flex-col mx-auto p-1 w-full">
      <div className="overflow-x-scroll">
        <div className="w-full inline-block align-middle">
   <h4 className=" m-1 mb-2 font-[600] text-sm text-zinc-600 ">Recent Goods</h4> 
          <div className="overflow-x-scroll border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className={th}>
                    Type
                  </th>
                  <th scope="col" className={th}>
                    Name
                  </th>
                  <th scope="col" className={th}>
                    Stock
                  </th>
                  <th scope="col" className={th}>
                    Unit
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
