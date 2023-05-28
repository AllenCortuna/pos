import React from 'react'

const DateInput = ({handleChange,date}) => {
  return (
    <>
      <input
        type="text"
        name="date"
        placeholder={date}
        className="font-regular w-28 border-grey-400 border p-2 px-4 rounded focus:border-2 focus:outline-none text-xs text-gray-400 inline focus:px-1 text-center focus:w-32"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        onChange={handleChange}
      />
    </>
  )
}

export default DateInput
