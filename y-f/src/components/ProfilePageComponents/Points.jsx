import React from "react";

const Points = ({ point }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex w-[500px] my-5 h-[15px]  justify-start items-center ">
        <div className="e bg-[#D9D9D9]  rounded-full   w-full h-[15px]"></div>
        <div
          className="absolute bg-yellow-primary  h-[15px] rounded-full"
          style={{ width: `${point}px` }}
        ></div>
      </div>
      <p className="font-medium mx-2 text-[15px]">{point} points</p>
    </div>
  );
};

export default Points;
