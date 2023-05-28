import React from "react";
import DateInput from "./Date";
import { useListStore } from "../../zustand/listStore";
import { useState,useEffect } from "react";
import { AdjustmentsIcon} from "@heroicons/react/outline";
import curDate from './curDate'

const DateRange = () => {
  const lists = useListStore((state) => state.lists);
  const setListByFilter = useListStore((state) => state.setListByFilter);

  //Date Input function
  const [start, setStart] = useState(curDate);
  const [end, setEnd] = useState(curDate);

  useEffect(() => {
    setListByFilter(lists)
 // eslint-disable-next-line
  }, [])
  

  const handleStart = (e) => {
    setStart(e.target.value);
  };  
  const handleEnd = (e) => {
    setEnd(e.target.value);
  };

  const handlSet = () => {
    
    function inRange(list) { return (list.date >= start && list.date <= end) }
    const rangeSelected = lists.filter(list => inRange(list))
    console.log(rangeSelected) //WARN: 
    setListByFilter(rangeSelected)
  };

  return (
    <div className="flex flex-wrap justify-center gap-1 h-min p-2 mx-auto w-80 rounded-full shadow-sm border max-w-md bg-white ">
      <DateInput date={start} handleChange={handleStart} />
      <DateInput date={end} handleChange={handleEnd} />

      <span
        className="bg-gray-200 rounded-xl rounded-tl-none rounded-bl-none border-2 shadow-sm px-1 pt-1 h-9 "
        onClick={handlSet}
      >
          <AdjustmentsIcon
         className="text-center w-6 my-auto text-gray-500" />
      </span>
    </div>
  );
};

export default DateRange;
