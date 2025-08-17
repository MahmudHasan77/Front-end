import React, { useMemo, useState } from "react";
import Container from "./Container";
import { useDispatch, useSelector } from "react-redux";
import { FaClipboardCheck } from "react-icons/fa";
import PriceFormatter from "./PriceFormatter";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "./../config/ServerUrl";
import { toast } from 'react-hot-toast';
import { RiLoader4Line } from "react-icons/ri";
import { shopping_cart } from "../redux/EcommerceSlice";

const CheckOut = () => {
  const shoppingCart = useSelector((state) => state?.ecommerce?.shopping_cart);
  const user_address_details = useSelector(
    (state) => state.ecommerce.user_address
  );
  const token = useSelector((state) => state?.ecommerce?.token);
const dispatch = useDispatch()
  const [selectedAddress, setSelectedAddress] = useState();
  const [isLoading, setLoading] = useState(false);
const navigate = useNavigate()
  const TruncatedDescription = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    }
    return str;
  };

  const calculateDiscount = (product) => {
    return Math.round(
      ((product?.old_price - product?.price) / product?.old_price) * 100
    );
  };

  const price_formatter = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const totalPrice = useMemo(() => {
    return shoppingCart?.reduce(
      (sum, product) => sum + product?.quantity * product?.product_id?.price,
      0
    );
  }, [shoppingCart]);


  const totalQuantity = useMemo(() => {
 return shoppingCart?.reduce((sum, cart) => sum + cart?.quantity,0);
  },[shoppingCart])

  const products_ids = shoppingCart?.map((cart)=>cart?.product_id?._id);

  const CashOnDelivery = async () => {
try {
  if (!shoppingCart?.length) {
    return toast.error("No Product in your Cart");
  }
      if (!selectedAddress) {
        return toast.error("Choose Any Address");
      }
      const orderData = {
        shopping_cart: shoppingCart,
        payment_status: "completed",
        delivery_address: selectedAddress,
        sub_total_amount: totalPrice,
        total_amount: totalPrice,
        quantity: totalQuantity,
        products_ids,
  };
  
      setLoading(true);
      const response = await axios.post(
        serverUrl + "/api/order/create_order",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = response?.data;
  if (data?.success) {
            try {
              const response = await axios.delete(
                serverUrl + "/api/cart/reset_cart",
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              const data = response?.data;
              if (data?.success) {
                toast.success('Order success')
                dispatch(shopping_cart([]));
                navigate("/ConfirmOrder");
              }
            } catch (error) {
              console.log(error);
              toast.error(error?.response?.data?.message);
            }
      }

} catch (error) {
  navigate("/FailedOrder");
  console.log(error);
 toast.error(error?.response?.data?.message) 
} finally {
  setLoading(false)
}
  };

  return (
    <Container className={"md:flex  justify-around m-2 gap-3"}>
      <div>
        <div className=" border flex-1 bg-zinc-50 border-gray-300 px-1 min-w-100">
          {user_address_details?.map((address, index) => {
            return (
              <div
                key={index}
                className=" cursor-context-menu rounded-sm flex items-center  gap-1 border bg-white customshadow1 p-2 border-gray-300 mt-5"
                onClick={() => setSelectedAddress(address._id)}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className=" w-5">
                    <FormControlLabel
                      value={address?._id}
                      control={
                        <Radio
                          checked={selectedAddress === address._id}
                          value={address._id}
                        />
                      }
                    />
                  </div>
                </div>
                <div className=" flex flex-wrap items-center justify-center">
                  <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                    address line :{" "}
                  </h1>
                  <p className=" text-[10px]">{address?.address_line},</p>
                  <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                    country :{" "}
                  </h1>
                  <p className=" text-[10px]">{address?.country},</p>
                  <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                    city :{" "}
                  </h1>
                  <p className=" text-[10px]">{address?.city},</p>
                  <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                    PINcode :{" "}
                  </h1>
                  <p className=" text-[10px]">{address?.PINcode},</p>
                  <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                    state:{" "}
                  </h1>
                  <p className=" text-[10px]">{address?.state},</p>
                  <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                    status :
                  </h1>
                  <p className=" text-[10px]">{address?.status},</p>
                  <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                    mobile :{" "}
                  </h1>
                  <p className=" text-[10px]">{address?.mobile},</p>
                </div>
              </div>
            );
          })}
          <Link to={"/Add_address_check_out"}>
            <button className=" text-center w-full border my-5 border-dashed p-1 bg-green-50 border-gray-400 cursor-pointer">
              Add Address
            </button>
          </Link>
        </div>
      </div>
      {/* total info */}
      <div className=" my-5 border border-gray-300  md:my-0 flex-1">
        <h1 className=" font-semibold  text-center p-3 bg-zinc-100">
          OUR ORDERS
        </h1>
        <div className=" grid grid-cols-5 p-2 font-semibold text-sm border-b border-zinc-200 justify-center">
          <h1 className=" col-span-2 text-center">Product</h1>
          <h1 className=" text-center">Quantity</h1>
          <h1 className=" text-center">Subtotal</h1>
          <h1 className=" text-center">Discount</h1>
        </div>
        {shoppingCart?.map((product) => {
          return (
            <div
              key={product?._id}
              className=" grid grid-cols-5 justify-center p-2 font-semibold items-center text-[13px]"
            >
              <div className=" col-span-2 flex items-center gap-2 justify-center">
                <img
                  className="w-10 h-10 object-contain"
                  src={product?.product_id?.images[0]}
                />
                <p>{TruncatedDescription(product?.product_id?.name, 20)}</p>
              </div>
              <h1 className=" col-span-1 text-center">
                ( {product?.quantity} )
              </h1>
              <h1 className=" col-span-1 text-orange-500">
                <PriceFormatter product={product?.product_id} />
              </h1>
              <h1 className=" col-span-1 font-semibold text-[12px]">
                {calculateDiscount(product?.product_id)}%
              </h1>
            </div>
          );
        })}
        <div className=" flex justify-around border-t border-gray-300 font-bold text-sm p-3 bg-zinc-100 text-orange-500">
          <p>Total Price</p>
          <p>{price_formatter(totalPrice)}</p>
        </div>
        {isLoading ? (
          <div className=" border w-full mx-auto my-3 p-1 font-bold text-white bg-orange-500 cursor-not-allowed flex items-center justify-center gap-5">
            <RiLoader4Line className=" text-xl animate-spin" />
            <div>Loading ... </div>
          </div>
        ) : (
          <div
            onClick={CashOnDelivery}
            className=" border w-full mx-auto my-3 p-1 font-bold text-white bg-orange-500 cursor-pointer flex items-center justify-center gap-5"
          >
            <FaClipboardCheck className=" text-lg" />
            <div>Cash On Delivery</div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CheckOut;
