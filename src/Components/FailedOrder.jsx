import React from "react";
import { Link } from "react-router-dom";
import { FcCancel } from "react-icons/fc";

const FailedOrder = () => {
  return (
    <div className=" bg-gray-100 p-5">
      <div className=" flex flex-col justify-center items-center p-5 bg-white h-50 w-50 mx-auto border border-gray-200">
        <span className=" text-5xl text-green-500">
          <FcCancel />
        </span>
        <h1 className=" font-bold py-5 text-red-500">Your Order Failed</h1>
        <Link
          to={"/"}
          className=" border px-5 py-1  border-orange-300 hover:text-orange-500"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default FailedOrder;
