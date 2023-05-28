import React from "react";
import { useListStore } from "../../zustand/listStore";
import { SearchIcon } from "@heroicons/react/solid";

const SearchInput = ({handleChange,search}) => {

  const searchLists = useListStore((state) => state.searchLists);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-1 h-min p-2 mx-auto w-80 rounded-full shadow-md border max-w-md bg-white ">
        <span>
          <input
            type="text"
            placeholder="search"
            className="w-60 h-9 text-xs font-normal p-2 text-gray-500 bg-none rounded-lg rounded-br-none rounded-tr-none text-center border col-span-2 focus:font-semibold focus:border-gray-400 focus:outline-none focus:border-none focus:text-gray-400 "
            onChange={handleChange}
          />
        </span>
        <span className="bg-gray-200 rounded-xl rounded-tl-none rounded-bl-none border-2 shadow-sm px-1 pt-1 h-9 " onClick={()=>searchLists(search)}>
<SearchIcon
            className="text-center w-6 my-auto text-gray-500"
          
          />
        </span>
      </div>
      <hr className="w-screen" />
    </>
  );
};

export default SearchInput;
