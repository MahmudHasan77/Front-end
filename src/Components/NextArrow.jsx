import React from "react";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className=" absolute left-0 top-[40%] z-10 h-7 w-7 bg-gray-400 rounded-full flex justify-center items-center text-white hover:bg-gray-800 duration-300 cursor-pointer "
    >
      <HiMiniArrowSmallLeft />
    </div>
  );
};

export default NextArrow;
