import React, { useEffect } from "react";
import Title from "../Ui/Title";
import { useSelector } from "react-redux";
import Container from "../Container";
import { BsCartX } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import CartInfo from "../CartInfo";

const Cart = () => {
  const navigate = useNavigate();
  const shopping_cart = useSelector(
    (state) => state?.ecommerce?.shopping_cart || []
  );
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);
  return (
    <Container>
      <div>
        {shopping_cart?.length > 0 ? (
          <div>
            <Title>My Cart</Title>
            <CartInfo shoppingCart={shopping_cart} />
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col gap-5">
            <span className="text-5xl text-red-600">
              <BsCartX />
            </span>
            <Title>No Product in your cart</Title>
            <p className="w-sm text-gray-600">
              Our broadcasts are prohibited from releasing videos of any Legal
            </p>
            <Link
              to={"/shop"}
              className="bg-gray-700 text-white py-1 px-8 rounded "
            >
              Continue shopping
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Cart;
