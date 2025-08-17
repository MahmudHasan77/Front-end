import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from 'tailwind-merge';

const PriceFormatter = ({ product, className }) => {
  const carts = useSelector((state) => state?.ecommerce?.shopping_cart)
  
  const [price, setPrice] = useState()

  useEffect(() => {
    const existingProduct = carts?.find((cart) => cart?.product_id?._id == product?._id)
    if (existingProduct?.quantity) {
      setPrice(product?.price*existingProduct?.quantity)
    } else {
      setPrice(product?.price)
    }
  }, [carts, product?._id, product?.price]);


  const formatUSD = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return <span className={twMerge(className)}>{formatUSD(price)}</span>;
};

export default PriceFormatter;
