import React from 'react'
import empty from './img/empty.svg'
const Empty = () => {
  return (
    <div className="w-sceen m-auto mt-10 ">
      <img alt="no list" src={empty} className="w-40 mx-auto m-3 "/>
      <p className="font-semibold text-normal text-gray-500 text-center ">No list Available...</p>
    </div>
  )
}

export default Empty
