import React from 'react'

const FormInput = ({name, value,type, handleChange, on}) => {
  return (
          <input
            autoComplete="off"
            placeholder={name}
            name={name}
            type={type}
            autoFocus={on}
            value = {value}
            onChange={handleChange}
            className="font-regular text-xs text-gray-600 m-auto w-full border-grey-400 border p-2 rounded focus:border-2 focus:outline-none focus:text-sm"

          ></input>
  )
}

export default FormInput
