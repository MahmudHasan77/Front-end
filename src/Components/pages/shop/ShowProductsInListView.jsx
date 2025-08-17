import React, { useState } from "react";
import { MdZoomOutMap } from "react-icons/md";
import { Link } from "react-router-dom";
import ProductRating from "../../Rating";
import AddToCardBtn from "../../AddToCardBtn";
import Loading from "./../../Loading";
import HotelClassIcon from "@mui/icons-material/HotelClass";
import DescriptionIcon from "@mui/icons-material/Description";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import { IoPricetags } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import PriceFormatter from "../../PriceFormatter";
import DOMPurify from "dompurify";
import truncate from "html-truncate";
import ZoomProduct from "../../ZoomProduct";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ShowProductsAsList = ({ products, isLoading }) => {
  const [productForZoom, setProductForZoom] = useState(null);

  const [isZoomOpen, setZoomOpen] = useState(false);

  const discountCalculator = (product) => {
    if (!product?.old_price || !product?.price) {
      return;
    }
    return Math.round(
      ((product?.old_price - product?.price) / product?.old_price) * 100
    );
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" w-full p-1 md:p-3 lg:p-5">
          {products?.map((product) => {
            return (
              <div
                key={product._id}
                className=" flex group customshadow justify-between gap-1 md:gap-2 h-55 border md:h-60 w-full  border-gray-300 my-3 md:my-5 duration-300 overflow-hidden rounded-t-sm bg-gray-100"
              >
                <div className=" m-auto relative overflow-hidden max-w-[40%] min-w-[39%] md:max-w-[30%] md:w-full h-30 sm:h-50 md:h-60">
                  <Link to={`/product/${product?._id}`}>
                    <LazyLoadImage
                      src={product?.images[0]}
                      alt={"product image"}
                      className=" object-contain w-full h-auto md:w-full  transition-all  duration-500 opacity-100 group-hover:opacity-0 "
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
                          onClick={(e) => {
                            setZoomOpen(true),
                              setProductForZoom(product),
                              e.stopPropagation(),
                              e.preventDefault();
                          }}
                          className=" hover:text-orange-500"
                        />
                      </span>
                    </div>
                    {product?.old_price && (
                      <button className="  absolute right-0 top-0.5 text-[11px] px-2 bg-orange-500 text-white rounded-l-full text-center">
                        {discountCalculator(product)}% off
                      </button>
                    )}
                  </Link>
                </div>
                {/* info */}
                <div className="flex flex-col gap-1 m-3 justify-between flex-1">
                  <div>
                    <h1 className={"text-sm "}>{product?.name?.length>50?product?.name.slice(0,50)+'...':product?.name}</h1>
                  </div>
                  <div className="text-[11px]  text-gray-600">
                    <span>{product?.ram}</span> /
                    <span> {product?.storage}</span>
                  </div>
                  <div className=" flex items-center gap-3 text-sm text-orange-500">
                    <IoPricetags className="text-blue-600 text-sm! md:text-[18px]! " />
                    <PriceFormatter product={product} />
                  </div>
                  <div className=" flex items-center gap-3">
                    <HotelClassIcon className="text-blue-600 text-[13px]! md:text-[20px]! " />
                    <ProductRating rating={product?.rating} />
                  </div>
                  <div className=" flex items-center gap-3 ">
                    <BrandingWatermarkIcon className="text-blue-600 text-[12px]! md:text-[18px]! " />
                    <p className="text-sm">{product?.brand}</p>
                  </div>
                  {product?.count_in_stock > 0 ? (
                    <div className=" flex items-center gap-3 -ml-0.5">
                      <GoDotFill className="text-green-500 text-[18px]! md:text-[22px]! " />
                      <p className="text-sm">
                        In Stock ({product?.count_in_stock})
                      </p>
                    </div>
                  ) : (
                    <div className=" flex items-center gap-3 -ml-0.5">
                      <GoDotFill className="text-red-600 text-[15px]! md:text-[25px]! " />
                      <p className="text-xs">Out of Stock</p>
                    </div>
                  )}

                  <div className="flex  items-center gap-3">
                    <DescriptionIcon className="text-blue-600 text-sm! " />
                    <div
                      className="text-xs text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: truncate(
                          DOMPurify.sanitize(product?.description),
                          10
                        ),
                      }}
                    ></div>
                  </div>
                  <div className=" w-[80%] md:w-[50%]">
                    <AddToCardBtn
                      product={product}
                      className={
                        "h-8 w-52 bg-orange-400 hover:bg-orange-700 text-lg"
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isZoomOpen && (
        <ZoomProduct
          isZoomOpen={isZoomOpen}
          setZoomOpen={setZoomOpen}
          product={productForZoom}
        />
      )}
    </>
  );
};

export default ShowProductsAsList;
