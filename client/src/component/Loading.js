import React from "react";
import loading from './img/loading.svg'

const Loading = () => {
  return (
    <div className="mx-auto my-5 flex justify-center content-center flex-row gap-3">
  <img alt="https://loading.io/asset/617587" src={loading} className="h-10 w-10" />
      <h4 className="font-[600] text-zinc-700 my-auto text-center text-xl">Loading...</h4>
    </div>
  );
};

export default Loading;
