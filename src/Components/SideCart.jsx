import React, {  useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { MdShoppingCart } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import PriceFormatter from "./PriceFormatter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniPlus } from "react-icons/hi2";
import { HiMinusSm } from "react-icons/hi";
import { serverUrl } from "../config/ServerUrl";
import axios from "axios";
import { shopping_cart } from "../redux/EcommerceSlice";
import toast from "react-hot-toast";
import { RiLoader3Fill } from "react-icons/ri";
import { RiLoader5Fill } from "react-icons/ri";

export default function SideCart() {
  const [open, setOpen] = React.useState(false);
  const shoppingCart = useSelector(
    (state) => state?.ecommerce?.shopping_cart 
  );
  const token = useSelector((state) => state?.ecommerce?.token);
  const [isUpdateLoading, setUpdateLoading] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(null);
  const [deleteCartLoading, setDeleteCartLoading] = useState(null);
  const [loadingType, setLoadingType] = useState(null);
  const dispatch = useDispatch();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const totalQuantity = useMemo(() => {
  return shoppingCart?.reduce((sum,cart)=>sum+cart?.quantity,0)
},[shoppingCart])
  const totalPrice = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const total_price = useMemo(() => {
 return shoppingCart?.reduce(
  (sum, cart) => sum + cart?.quantity * cart?.product_id?.price,
  0
)  },[shoppingCart])


  const updateQuantity = async (id, type, quantity) => {
    if (quantity == 1 && type == "decrease") {
      try {
        setDeleteLoading(id);
        setUpdateLoading(id);
        setLoadingType(type);
        const response = await axios.post(
          serverUrl + `/api/cart/delete_cart/${id}`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response?.data;
        console.log(data);
        if (data?.success) {
          try {
            const response = await axios.get(serverUrl + "/api/cart/get_cart", {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = response?.data;
            dispatch(shopping_cart(data?.carts));
          } catch (error) {
            toast.error(error?.response?.data?.message);
          }
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      } finally {
        setDeleteLoading(null);
        setUpdateLoading(null);
        setLoadingType(null);
      }
    } else {
      try {
        setUpdateLoading(id);
        setUpdateLoading(id);
        setLoadingType(type);
        const response = await axios.post(
          serverUrl + `/api/cart/update_quantity/${id}`,
          { type },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response?.data;
        if (data?.success) {
          try {
            const response = await axios.get(serverUrl + "/api/cart/get_cart", {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = response?.data;
            dispatch(shopping_cart(data?.carts));
          } catch (error) {
            toast.error(error?.response?.data?.message);
          }
        } else {
          toast.error(data?.message);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to update cart");
      } finally {
        setUpdateLoading(null);
        setLoadingType(null);
        setDeleteLoading(null);
      }
    }
  };

  const delete_cart = async (id) => {
    try {
      setDeleteCartLoading(id);
      const response = await axios.post(
        serverUrl + `/api/cart/delete_cart/${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response?.data;
      if (data?.success) {
        try {
          const response = await axios.get(serverUrl + "/api/cart/get_cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = response?.data;
          dispatch(shopping_cart(data?.carts));
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setDeleteCartLoading(null);
    }
  };
  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      className="overflow-y-scroll hiddenScroll"
    >
      <h1 className=" font-bold text-center p-2">My Carts</h1>
      <div className=" border border-zinc-100 customshadow max-h-[100%] min-h-[100%] SideCartScroll m-1 overflow-y-auto">
        {shoppingCart?.length > 0 && (
          <>
            {shoppingCart?.map((cart) => {
              return (
                <div
                  key={cart?._id}
                  className="my-2 flex items-center justify-between gap-1 border border-gray-200 bg-green-50"
                >
                  <img
                    className=" w-10 h-10 object-contain"
                    src={cart?.product_id?.images[0]}
                  />
                  <div className="pl-1 font-semibold text-sm grid justify-between gap-2">
                    <p className=" text-xs">{cart?.product_id?.name?.length>30?cart?.product_id?.name?.slice(0,30)+'...':cart?.product_id?.name}</p>
                    <p className=" text-xs">Qty : {cart?.quantity}</p>
                    <div className=" text-[11px]">
                      {
                        <PriceFormatter
                          product={cart?.product_id}
                          className={"text-orange-500"}
                        />
                      }
                    </div>
                  </div>

                  <div className=" flex justify-between items-center border border-orange-500 overflow-hidden gap-3 w-13 min-w-13 bg-white  rounded-full mr-2">
                    {isDeleteLoading ||
                    (isUpdateLoading == cart?.product_id?._id &&
                      loadingType == "decrease") ? (
                      <button className=" bg-orange-500 text-white pl-1">
                        <RiLoader3Fill className=" animate-spin" />
                      </button>
                    ) : (
                      <button
                        className=" bg-orange-400 cursor-pointer text-white pl-1"
                        onClick={() =>
                          updateQuantity(
                            cart?.product_id?._id,
                            "decrease",
                            cart?.quantity
                          )
                        }
                      >
                        <HiMinusSm className="" />
                      </button>
                    )}

                    {isUpdateLoading == cart?.product_id?._id &&
                    loadingType == "increase" ? (
                      <button className=" bg-orange-500 text-white pl-1">
                        <RiLoader3Fill className=" animate-spin" />
                      </button>
                    ) : (
                      <button
                        className=" bg-orange-400 cursor-pointer text-white pl-1"
                        onClick={() =>
                          updateQuantity(
                            cart?.product_id?._id,
                            "increase",
                            cart?.quantity
                          )
                        }
                      >
                        <HiMiniPlus className="" />
                      </button>
                    )}
                  </div>
                  {deleteCartLoading == cart?.product_id?._id ? (
                    <span className=" text-red-500">
                      <RiLoader5Fill className=" animate-spin" />
                    </span>
                  ) : (
                    <span className=" hover:text-red-500 cursor-pointer">
                      <AiTwotoneDelete
                        onClick={() => delete_cart(cart?.product_id?._id)}
                      />
                    </span>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="px-7 my-2 grid gap-2 sticky bottom-0 bg-white pt-3">
        <div className=" flex justify-between items-center font-extralight text-xs border-b border-zinc-200 pb-1">
          <p className=" ">Total Quantity</p>
          <span>{totalQuantity}</span>
        </div>
        <div className=" flex justify-between items-center font-extralight text-xs border-b border-zinc-200 pb-1">
          <p>Total Price</p>
          <span>
            {/* <PriceFormatter /> */}
            {totalPrice(total_price)}
          </span>
        </div>
        <div className=" flex justify-around items-center my-3">
          <Link
            onClick={toggleDrawer(false)}
            to={"/cart"}
            className=" text-[11px]! px-2 py-1 text-white  customshadow bg-orange-400 hover:bg-orange-500 border"
          >
            View Cart
          </Link>{" "}
          <Link
            onClick={toggleDrawer(false)}
            className=" text-[11px]! px-2 py-1 text-white  customshadow bg-orange-400 hover:bg-orange-500 border"
            to={"/checkout"}
          >
            Check Out
          </Link>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
      <span className=" cursor-context-menu" onClick={toggleDrawer(true)}>
        <span className="relative group">
          <MdShoppingCart className=" text-lg text-orange-400 hover:text-orange-500 duration-300  " />
          <span className=" -top-2 -right-1  absolute text-white bg-orange-400  group-hover:bg-orange-500 text-[7px]   rounded-full h-3.5 w-3.5 flex items-center justify-center">
            {totalQuantity?totalQuantity:0}
          </span>
        </span>
      </span>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
