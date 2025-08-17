import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { Link } from "react-router-dom";

const ConfirmOrder = () => {
  return (
    <div className=" bg-gray-100 p-5">
      <div className=" flex flex-col justify-center items-center p-5 bg-white h-50 w-50 mx-auto border border-gray-200">
        <span className=" text-5xl text-green-500">
          <GiCheckMark />
              </span>
              <h1 className=" font-bold py-5 text-green-500">Your Order is Placed</h1>
              <Link to={'/'} className=" border px-5 py-1 rounded-sm border-orange-300 hover:text-orange-500">Go to Home</Link>
      </div>
    </div>
  );
};

export default ConfirmOrder;
