import React, { useEffect, useState } from 'react'
import { serverUrl } from '../config/ServerUrl';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Title from './Ui/Title';
import AddToCardBtn from './AddToCardBtn';
import ProductRating from './Rating';

const Electronics = () => {
  const [products,setProducts]=useState()

      useEffect(() => {
        try {
          const getProduct = async () => {
            const response = await axios.get(serverUrl + "/product/list");
            const data = response?.data;
            if (data?.success) {
              setProducts(data?.productList);
            } 
          };
          getProduct();
        } catch (error) {
          console.log(error);
        }
      }, []);
    
    
  return (
    <>
      <div className="flex flex-wrap gap-3 md:gap-5 justify-center">
        {products?.map((product) => (
          <>
            <div className="border w-[150px] h-55 md:w-[170px]   border-gray-300 my-2  shadow-xs hover:scale-105 group hover:shadow-sm  duration-300 overflow-hidden rounded-t-sm bg-gray-100">
              <div className=" m-auto relative overflow-hidden w-full md:w-full h-30">
                <Link to={`/product/${product?._id}`}>
                  <img
                    src={product?.images[0]}
                    className=" object-cover w-full h-30 transition-all group-hover:scale-110 duration-500 opacity-100 group-hover:opacity-0"
                  />

                  <img
                    src={product?.images[1]}
                    className=" object-cover w-full h-full transition-all group-hover:scale-110 duration-500 group-hover:opacity-100 opacity-0 absolute top-0 left-0"
                  />

                  <div className="flex gap-3 absolute -top-15 group-hover:top-7 duration-400 opacity-0  group-hover:opacity-100 right-2 flex-col ">
                    <Link className=" bg-zinc-50 p-1 rounded-full font-bold">
                      {/* <AiOutlineHeart className="text-lg hover:text-orange-500" /> */}
                    </Link>
                    <Link className=" bg-zinc-50 p-1 rounded-full font-bold">
                      {/* <MdZoomOutMap className=" hover:text-orange-500" /> */}
                    </Link>
                  </div>
                  {product?.offer && (
                    <button className="  absolute right-0 top-0.5 text-[12px] px-3 text-white bg-gray-800 rounded-l-[2px] hover:bg-gray-950 text-center">
                      sale
                    </button>
                  )}
                </Link>
              </div>

              <div className="flex flex-col gap- m-3">
                <div>
                  <Title className={"text-sm "}>{product?.name}</Title>
                </div>
                <div className="text-sm">
                  {/* <PriceContainer product={product} /> */}
                </div>
                <div className="">
                  <ProductRating />
                </div>
                <div>
                  <AddToCardBtn product={product} />
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Electronics