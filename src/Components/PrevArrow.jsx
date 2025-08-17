import React from 'react'
import { HiMiniArrowSmallRight } from "react-icons/hi2";

const PrevArrow = (props) => {
  const {onClick}=props
  return (
    <div
      onClick={onClick}
      className="absolute top-[40%]  right-0 z-10 h-7 w-7 bg-gray-400 rounded-full flex justify-center items-center text-white hover:bg-gray-800 cursor-pointer duration-300"
    >
      <HiMiniArrowSmallRight />
    </div>
  );
}

export default PrevArrow
