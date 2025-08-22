import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddToCardBtn from "../../AddToCardBtn";
import Loading from "../../Loading";
import { AiOutlineHeart } from "react-icons/ai";
import { MdZoomOutMap } from "react-icons/md";
import ProductRating from "../../Rating";
import ZoomProduct from "../../ZoomProduct";
import PriceFormatter from "../../PriceFormatter";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ShowProductsInGridView = ({ products, isLoading }) => {
  const [productForZoom, setProductForZoom] = useState(null);

  const [isZoomOpen, setZoomOpen] = useState(false);

  const truncateName = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  
  const discountCalculator = (product) => {
    if (!product?.old_price || !product?.price) {
      return;
    }
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex flex-wrap gap-3 md:gap-5 justify-center">
            {products?.map((product) => (
                <div
                  key={product?._id}
                  className="border w-[150px] h-63 md:w-[170px]   border-gray-300 my-2  customshadow hover:scale-105 group hover:shadow-sm  duration-300 overflow-hidden rounded-t-sm bg-gray-100"
                >
                  <div className=" m-auto relative overflow-hidden w-full md:w-full h-30">
                    <Link to={`/product/${product?._id}`}>

                      <LazyLoadImage
                        src={product?.images[0]}
                        alt={"product image"}
                        className=" object-cover w-30 h-30 transition-all group-hover:scale-110 duration-500 opacity-100 group-hover:opacity-0"
                        effect="blur"
                        placeholderSrc="https://res.cloudinary.com/dpf3ipd7p/image/upload/v1755093621/blur-white_fskalg.jpg"
                      />
                      <img
                        src={
                          product?.images[1]
                            ? product?.images[1]
                            : product?.images[0]
                        }
                        className=" object-cover w-full h-full transition-all group-hover:scale-110 duration-500 group-hover:opacity-100 opacity-0 absolute top-0 left-0"
                      />

                      <div className="flex gap-3 absolute -top-15 group-hover:top-7 duration-400 opacity-0  group-hover:opacity-100 right-2 flex-col ">
                        <span className=" bg-zinc-50 p-1 rounded-full font-bold cursor-pointer">
                          <MdZoomOutMap
                            className=" hover:text-orange-500"
                            onClick={(e) => {
                              setZoomOpen(true),
                                setProductForZoom(product),
                                e.stopPropagation(),
                                e.preventDefault();
                            }}
                          />
                        </span>
                      </div>
                      {product?.old_price && (
                        <button className="  absolute right-0 top-0.5 text-[11px] px-2 bg-orange-500 text-white rounded-l-full text-center">
                          - {discountCalculator(product)}%
                        </button>
                      )}
                    </Link>
                  </div>

                  <div className="flex flex-col gap- m-3">
                    <div>
                      <h1 className={"text-xs"}>
                        {truncateName(product?.name, 17)}
                      </h1>
                    </div>
                    <div className="text-[11px]  text-gray-600">
                      <span>{product?.ram}</span> 
                      <span> {product?.storage}</span>
                    </div>
                    <div className="">
                      <ProductRating rating={product?.rating} />
                    </div>
                    <div className="text-sm">
                      <span className=" text-xs line-through text-gray-500">
                        {price_formatter(product?.old_price)}
                      </span>
                    </div>
                    <div className="text-sm text-orange-500">
                      <PriceFormatter product={product} />
                    </div>
                    <div>
                      <AddToCardBtn product={product} />
                    </div>
                  </div>
                </div>
            ))}
            {isZoomOpen && (
              <ZoomProduct
                isZoomOpen={isZoomOpen}
                setZoomOpen={setZoomOpen}
                product={productForZoom}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ShowProductsInGridView;
