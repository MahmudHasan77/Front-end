import React, { useState } from "react";
import AddToCardBtn from "./AddToCardBtn";
import { Link } from "react-router-dom";
import Title from "./Ui/Title";
import ProductRating from "./Rating";
import { MdDelete } from "react-icons/md";
import PriceFormatter from "./PriceFormatter";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import { serverUrl } from "../config/ServerUrl";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { shopping_cart } from "../redux/EcommerceSlice";
import { RiLoader4Line } from "react-icons/ri";

const CartInfo = ({ shoppingCart }) => {
  const dispatch = useDispatch();

  const [isDeleteLoading, setDeleteCartLoading] = useState(null);
  const token = useSelector((state) => state?.ecommerce?.token);
  const [isResetCartLoading, setResetCartLoading] = useState(false);

  const handleResetCart = async () => {
    try {
      setResetCartLoading(true);
      const response = await axios.delete(serverUrl + "/api/cart/reset_cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response?.data;
      if (data?.success) {
        dispatch(shopping_cart([]));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setResetCartLoading(false);
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

  const subtotalPrice = shoppingCart?.reduce(
    (sum, cart) => sum + (cart?.quantity || 0) * (cart?.product_id?.price || 0),
    0
  );

  const price_formatter = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
  const old_price = shoppingCart?.reduce(
    (sum, cart) => sum + (cart?.quantity * cart?.product_id?.old_price || 0),
    0
  );
  return (
    <div className=" md:flex h-full ">
      <div className=" flex-1 md:max-w-[70%]">
        {shoppingCart?.map((cart) => (
          <div
            key={cart._id}
            className={`${
              isResetCartLoading && " bg-black opacity-30"
            }  bg-white p-1 m-3  flex border border-zinc-200 customshadow gap-2 items-center md:justify-around md:max-w-[100%]`}
          >
            <div className="w-20 h-20 ">
              <Link to={`/product/${cart?.product_id?._id}`} className="">
                <img
                  src={cart?.product_id?.images[0]}
                  className="  w-20 h-20 object-contain col-span-2 m-auto"
                />
              </Link>
            </div>

            <div className=" grid gap-1 mt-1 flex-1 md:flex-0  md:gap-3">
              <p className=" font-semibold text-xs">
                {cart?.product_id?.name.length > 50
                  ? cart?.product_id?.name.slice(0, 50) + "..."
                  : cart?.product_id?.name}
              </p>
              <p className="">
                <ProductRating rating={cart?.product_id?.rating} />
              </p>
              <PriceFormatter
                product={cart?.product_id}
                className={"text-orange-500 text-sm"}
              />
              <p className=" font-extralight text-sm">
                Quantity:{" "}
                <span className=" text-orange-400">{cart?.quantity}</span>
              </p>

              <div className=" w-[50%] md:w-[100%]">
                {<AddToCardBtn product={cart?.product_id} />}
              </div>
              <p className=" text-sm text-orange-500 font-semibold"></p>
            </div>

            <div className="px-5">
              {isDeleteLoading == cart?.product_id?._id ? (
                <RiLoader4Line className=" text-orange-500 text-xl animate-spin" />
              ) : (
                <AiTwotoneDelete
                  onClick={() => delete_cart(cart?.product_id?._id)}
                  className=" hover:text-red-500 text-xl cursor-pointer"
                />
              )}
            </div>
          </div>
        ))}
        <button
          onClick={handleResetCart}
          className="bg-red-500 text-white px-7 mx-3 py-1 hover:bg-red-700 duration-200 rounded-xs font-semibold  cursor-pointer"
        >
          Reset Cart
        </button>
      </div>

      <div className="flex flex-col items-center font-bold customshadow text-sm gap-3 md:gap-5 px-1 md:px-5 py-5 border border-zinc-200 min-h-full mt-3 mb-9 mx-3">
        <Title>Cart Total</Title>
        <div className="w-50 flex flex-col gap-1 md:gap-3">
          <div className="flex justify-between px-5 py-0.5 bg-gray- border border-gray-200">
            <p>Subtotal :</p>
            <span>{price_formatter(subtotalPrice)}</span>
          </div>
          <div className="flex justify-between px-5 py-0.5 bg-gray- border border-gray-200">
            <p>Discount :</p>
            <p>
              <span>
                {price_formatter(Math.max(old_price - subtotalPrice, 0))}
              </span>
            </p>
          </div>
          <div className="flex justify-between px-5 py-0.5 bg-gray- border border-gray-200">
            <p>Shipping :</p>
            <p>
              <span>{price_formatter(50)}</span>
            </p>
          </div>
          <div className="flex justify-between px-5 py-0.5 bg-gray- border border-gray-200">
            <p>Total :</p>
            <p>{price_formatter(subtotalPrice + 50)}</p>
          </div>
        </div>
        <Link
          to={"/checkout"}
          className=" text-sm bg-orange-500  text-white cursor-pointer hover:bg-orange-700 px-5 text-center duration-300 w-50 py-1 mt-3"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
};

export default CartInfo;
