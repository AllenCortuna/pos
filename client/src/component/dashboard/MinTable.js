
const MinTable = ({ element }) => {
  const th = "p-2 text-xs font-bold text-left text-zinc-500 uppercase";
  return (
    <div className=" bg-white shadow-md rounded-md flex flex-col mx-auto p-1 w-full">
      <div className="overflow-x-scroll">
        <div className="w-full inline-block align-middle">
          <div className="overflow-x-scroll border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className={th}>
                    Minimum Good
                  </th>
                  <th scope="col" className={th}>
                    Stock
                  </th>
                  <th scope="col" className={th}>
                    Unit
                  </th>
                  <th scope="col" className={th}>
                    Type
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

export default MinTable
