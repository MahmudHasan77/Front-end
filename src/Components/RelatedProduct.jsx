import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AddToCardBtn from "./AddToCardBtn";
import Title from "./Ui/Title";
import ProductRating from "./Rating";
import { AiOutlineHeart } from "react-icons/ai";
import { MdZoomOutMap } from "react-icons/md";

import ZoomProduct from "./ZoomProduct";
import "@splidejs/splide/dist/css/splide.min.css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PriceFormatter from "./PriceFormatter";

const RelatedProduct = ({ products, relatedLoading }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [productForZoom, setProductForZoom] = useState(null);
  const [isZoomOpen, setZoomOpen] = useState(false);

  const old_price_formatter = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
  useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params.navigation
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);



  const discountCalculator = (product) => {
    if (!product?.old_price || !product?.price) {
      return;
    }
    return Math.round(
      ((product?.old_price - product?.price) / product?.old_price) * 100
    );
  };

  const truncateName = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };



  return (
    <>
      <>
        {relatedLoading ? (
          <>
            <div className=" flex gap-3 flex-wrap h-40 overflow-hidden justify-center">
              <div className=" border h-40 bg-zinc-300 w-50 flex justify-between flex-col rounded-sm border-gray-300 animate-pulse">
                <div className="  h-30 flex-1  bg-white/50 m-0.5 rounded-sm"></div>
                <div className="h-3 w-[50%] ml-3  bg-zinc-200 mb-2"></div>
                <div className="h-5 w-full bg-zinc-200 mb-2"></div>
              </div>
              <div className=" border h-40 bg-zinc-300 w-50 flex justify-between flex-col rounded-sm border-gray-300 animate-pulse">
                <div className="  h-30 flex-1  bg-white/50 m-0.5 rounded-sm"></div>
                <div className="h-3 w-[50%] ml-3  bg-zinc-200 mb-2"></div>
                <div className="h-5 w-full bg-zinc-200 mb-2"></div>
              </div>
              <div className=" border h-40 bg-zinc-300 w-50 flex justify-between flex-col rounded-sm border-gray-300 animate-pulse">
                <div className="  h-30 flex-1  bg-white/50 m-0.5 rounded-sm"></div>
                <div className="h-3 w-[50%] ml-3  bg-zinc-200 mb-2"></div>
                <div className="h-5 w-full bg-zinc-200 mb-2"></div>
              </div>
              <div className=" border h-40 bg-zinc-300 w-50 flex justify-between flex-col rounded-sm border-gray-300 animate-pulse">
                <div className="  h-30 flex-1  bg-white/50 m-0.5 rounded-sm"></div>
                <div className="h-3 w-[50%] ml-3  bg-zinc-200 mb-2"></div>
                <div className="h-5 w-full bg-zinc-200 mb-2"></div>
              </div>
              <div className=" border h-40 bg-zinc-300 w-50 flex justify-between flex-col rounded-sm border-gray-300 animate-pulse">
                <div className="  h-30 flex-1  bg-white/50 m-0.5 rounded-sm"></div>
                <div className="h-3 w-[50%] ml-3  bg-zinc-200 mb-2"></div>
                <div className="h-5 w-full bg-zinc-200 mb-2"></div>
              </div>
              <div className=" border h-40 bg-zinc-300 w-50 flex justify-between flex-col rounded-sm border-gray-300 animate-pulse">
                <div className="  h-30 flex-1  bg-white/50 m-0.5 rounded-sm"></div>
                <div className="h-3 w-[50%] ml-3  bg-zinc-200 mb-2"></div>
                <div className="h-5 w-full bg-zinc-200 mb-2"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            {products?.length > 0 && (
              <div className="relative">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView={3}
                  onSwiper={(swiper) => {
                    setSwiperInstance(swiper);
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                  }}
                  onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                  }}
                  breakpoints={{
                    0: { slidesPerView: 2.3 },
                    600: { slidesPerView: 3 },
                    940: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                  }}
                >
                  {products?.map((product) => (
                    <SwiperSlide key={product._id}>
                      <div className="mb-5 mt-2 h-56" key={product._id}>
                        <div className="border border-gray-300 shadow-xs hover:scale-105 group hover:shadow-sm h-full m-auto w-45  md:w-55 duration-300 overflow-hidden rounded-t-sm bg-gray-100">
                          <div className=" w-full h-24 m-auto relative overflow-hidden">
                            <Link to={`/product/${product?._id}`}>
                              <img
                                src={product?.images[0]}
                                className="w-full h-24 object-contain transition-all group-hover:scale-110 duration-500 opacity-100 group-hover:opacity-0"
                              />

                              <LazyLoadImage
                                src={product?.images[0]}
                                alt={"product image"}
                                effect="blur"
                                placeholderSrc="data:image/jpeg;base64,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"
                              />

                              <img
                                src={
                                  product?.images[1]
                                    ? product?.images[1]
                                    : product?.images[0]
                                }
                                className=" object-cover w-full h-full transition-all group-hover:scale-110 duration-500 group-hover:opacity-100 opacity-0 absolute top-0 left-0"
                              />
                            </Link>

                            <div className="flex gap-3 absolute -top-15 group-hover:top-7 duration-400 opacity-0  group-hover:opacity-100 right-2 flex-col ">
                              <span className=" bg-zinc-50 p-1 rounded-full font-bold">
                                <MdZoomOutMap
                                  className=" hover:text-orange-500"
                                  onClick={() => {
                                    setZoomOpen(true),
                                      setProductForZoom(product);
                                  }}
                                />
                              </span>
                            </div>
                            {product?.old_price && (
                              <button className="  absolute right-0 top-0.5 text-[11px] px-2 bg-orange-500 text-white rounded-l-full text-center">
                                {discountCalculator(product)}% off
                              </button>
                            )}
                          </div>

                          <div className="flex flex-col gap- m-3">
                            <div>
                              <h1 className={"text-xs"}>
                                {truncateName(product?.name, 20)}
                              </h1>
                            </div>
                            <div className="text-[11px]  text-gray-600">
                              <span>{product?.ram}</span> /
                              <span> {product?.storage}</span>
                            </div>
                            <div className="text-xs line-through text-gray-400">
                              {old_price_formatter(product?.old_price)}
                            </div>
                            <div className="text-sm text-orange-500">
                              <PriceFormatter product={product} />
                            </div>
                            <div className="">
                              <ProductRating rating={product?.rating} />
                            </div>
                            <div>
                              <AddToCardBtn product={product} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                  <button
                    ref={prevRef}
                    disabled={isBeginning}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow
            ${
              isBeginning
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-orange-500 text-black hover:text-white"
            }`}
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    ref={nextRef}
                    disabled={isEnd}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow
            ${
              isEnd
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-orange-500 text-black hover:text-white"
            }`}
                  >
                    <FaChevronRight />
                  </button>
                </Swiper>
              </div>
            )}
          </>
        )}
      </>

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

export default RelatedProduct;
