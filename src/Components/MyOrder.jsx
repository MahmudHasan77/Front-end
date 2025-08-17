import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "./../config/ServerUrl";
import { toast } from "react-hot-toast";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state?.ecommerce?.token);
  console.log(orders);
  const [isOpen, setOpen] = useState("");
  const handleOpen = (e) => {
    if (e === isOpen) {
      setOpen("");
    } else {
      setOpen(e);
    }
  };

  const priceFormatter = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  useEffect(() => {
    const fetchingOrders = async () => {
      try {
        const response = await axios.get(serverUrl + "/api/order/get_orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response?.data;
        setOrders(data?.orders);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    };
    fetchingOrders();
  }, [token]);

  return (
    <div className="w-full bg-gray-100">
      {orders?.map((order) => {
        return (
          <div
            key={order?._id}
            className="mx-1 mb-3 border border-gray-300 bg-white"
          >
            <div className=" flex flex-col items-center w-full max-h-30 gap-3 ">
              <div className="flex  w-full flex-wrap justify-center gap-2">
                <div className="flex items-center">
                  <p className="xsLight">Order : </p>
                  <p className=" text-[#F29339]! xsLight ">
                    {order?.order_status} ,
                  </p>
                </div>

                <div className="flex items-center">
                  <p className="xsLight">Date : </p>
                  <p className="xsLight">{order?.createdAt?.split("T")[0]} ,</p>
                </div>
              </div>
            </div>
            <button
              className=" relative text-center  w-full bg-blue-50/50 text-xs p-1 text-blue-500 md:text-sm capitalize"
              onClick={() => handleOpen(order?._id)}
            >
              view order summary
              {isOpen ? (
                <RiArrowUpWideLine className=" absolute top-2 right-[20%]" />
              ) : (
                <RiArrowDownWideLine className=" absolute top-2 right-[20%]" />
              )}
            </button>
            <div
              className={`${
                isOpen === order?._id
                  ? " opacity-100 min-h-80"
                  : " opacity-0 min-h-0 max-h-0"
              } transition-all duration-500 bg-white`}
            >
              <div className=" w-full">
                <div className=" text-xs p-1 md:p-3 leading-7 w-full md:text-sm">
                  <div className="flex justify-between w-full border-b border-gray-200">
                    <p>Order ID:</p> <p>{order?._id}</p>{" "}
                  </div>
                  <div className="flex justify-between w-full border-b border-gray-200">
                    <p>Paymant ID:</p>
                    <p>
                      {order?.payment_id
                        ? order?.payment_id
                        : "Cash on Delivery"}
                    </p>{" "}
                  </div>
                  <div className="flex justify-between gap-3 w-full border-b border-gray-200">
                    <p className="">Address:</p>{" "}
                    <div className="text-end">
                      <span>{order?.delivery_address?.country} </span> ,
                      <span> {order?.delivery_address?.city}</span>,
                      <span> {order?.delivery_address?.state}</span>,
                      <span> {order?.delivery_address?.PINcode}</span>,
                      <span> {order?.delivery_address?.address_line}</span>,
                      <span>+ {order?.delivery_address?.mobile}</span>
                    </div>{" "}
                  </div>
                  <div className="flex justify-between w-full border-b border-gray-200">
                    <p>Price:</p>
                    <p>{priceFormatter(Number(order?.total_amount))}</p>
                  </div>
                  <div className="flex justify-center w-full border-b border-gray-200 font-bold">
                    Products
                  </div>

                  <div>
                    <div className=" grid grid-cols-2  w-full border-b border-gray-200">
                      <p>Image</p>
                      <p>Name</p>
                    </div>
                    {order?.product?.map((prod) => {
                      return (
                        <div
                          key={prod?._id}
                          className=" grid grid-cols-2  w-full border-b border-gray-200"
                        >
                          <img
                            src={prod?.images[0]}
                            className=" h-10 w-10 object-contain"
                          />
                          <p>{prod?.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrder;
