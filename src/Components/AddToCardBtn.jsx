import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { toast } from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../config/ServerUrl";
import { RiLoader3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { shopping_cart } from "../redux/EcommerceSlice";

const AddToCardBtn = ({ product }) => {
  const token = useSelector((state) => state?.ecommerce?.token);
  const dispatch = useDispatch();
  const cart_products = useSelector((state) => state?.ecommerce?.shopping_cart);
  const [isUpdateLoading, setUpdateLoading] = useState(null);
  const [isDeleteLoading, setDeleteLoading] = useState(false);

  const existingProduct = useMemo(() => {
    return cart_products?.find(
      (prod) => prod?.product_id?._id === product?._id
    );
  }, [cart_products, product?._id]);

  const [addToCartLoading, setAddToCartLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (token) {
      try {
        setAddToCartLoading(true);
        const response = await axios.post(
          serverUrl + `/api/cart/add_to_cart`,
          { product_id: product?._id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response?.data;
        if (data?.success) {
          toast.success(data?.message);
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
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setAddToCartLoading(false);
      }
    } else {
      toast.error(`Please Log in`);
      navigate("/signin");
    }
  };

  const updateQuantity = async (id, type) => {
    if (existingProduct?.quantity == 1 && type == "decrease") {
      try {
        setDeleteLoading(true);
        const response = await axios.post(
          serverUrl + `/api/cart/delete_cart/${product?._id}`,
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
        setDeleteLoading(false);
      }
    } else {
      try {
        setUpdateLoading(type);
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
      }
    }
  };

  return (
    <>
      {existingProduct && existingProduct?.quantity > 0 ? (
        <div className="flex -200 rounded-full px-2 gap-3 items-center w-full border border-orange-400 overflow-hidden justify-between ">
          {isDeleteLoading || isUpdateLoading == "decrease" ? (
            <button
              // disabled={isExistingProduct?.quantity === 0}
              className="border border-orange-400 bg-orange-400 h-6 -translate-x-2 pl-2 pr-1 disabled:cursor-not-allowed  cursor-pointer hover:bg-gray-200  rounded-xs"
            >
              <RiLoader3Fill className=" animate-spin" />
            </button>
          ) : (
            <button
              // disabled={isExistingProduct?.quantity === 0}
              onClick={() => updateQuantity(product?._id, "decrease")}
              className="border border-orange-400 bg-orange-400 h-6  -translate-x-2 pl-2 pr-1 disabled:cursor-not-allowed  cursor-pointer hover:bg-gray-200  rounded-xs"
            >
              <FaMinus className="" />
            </button>
          )}

          <span className="  w-8 h-full rounded-full shadow bg-white text-center ">
            {existingProduct?.quantity}
          </span>
          {isUpdateLoading == "increase" ? (
            <button className=" border border-orange-400 bg-orange-400 h-6 translate-x-2 pr-2 pl-1 cursor-pointer hover:bg-gray-200 rounded-xs">
              <RiLoader3Fill className=" animate-spin" />
            </button>
          ) : (
            <button
              onClick={() => updateQuantity(product?._id, "increase")}
              className=" border border-orange-400 bg-orange-400 h-6 translate-x-2 pr-2 pl-1 cursor-pointer hover:bg-gray-200 rounded-xs"
            >
              <FaPlus />
            </button>
          )}
        </div>
      ) : (
        <div className=" w-full">
          <button
            onClick={handleAddToCart}
            className={twMerge(
              "bg-orange-400 w-full relative cursor-pointer rounded-xs text-white text-sm px-5 text-center py-0.5 hover:bg-gray-900 duration-300"
              // className
            )}
          >
            {addToCartLoading && (
              <span>
                <RiLoader3Fill className=" absolute -translate-y-1/2 top-1/2 animate-spin" />
              </span>
            )}
            <span className="ml-3">Add to Cart</span>
          </button>
        </div>
      )}
    </>
  );
};

export default AddToCardBtn;
