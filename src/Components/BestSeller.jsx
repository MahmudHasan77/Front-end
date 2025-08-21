import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverUrl } from "../config/ServerUrl";
import { Link } from "react-router-dom";
import AddToCardBtn from "./AddToCardBtn";
import ProductRating from "./Rating";
import {MdZoomOutMap } from "react-icons/md";
import ZoomProduct from "./ZoomProduct";
import "@splidejs/splide/dist/css/splide.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import { FaImage } from "react-icons/fa6";
import  AOS  from 'aos';

const BestSeller = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [products, setProducts] = useState([]);
  const [productForZoom, setProductForZoom] = useState(null);
  const [isZoomOpen, setZoomOpen] = useState(false);
  useEffect(() => {
  AOS.init()
},[])
      const truncateName = (str, num) => {
        if (str.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
      };
    const old_price_formatter = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    };

    const discountCalculator = (product) => {
      if (!product?.old_price || !product?.price) {
        return;
      }
      return Math.round(
        ((product?.old_price - product?.price) / product?.old_price) * 100
      );
    };

  useEffect(() => {
    try {
      const getProduct = async () => {
        const response = await axios.get(
          serverUrl + "/api/product/filter_product?rating=4"
        );
        const data = response?.data;
        if (data?.success) {
          setProducts(data?.products);
        }
      };
      getProduct();
    } catch (error) {
      console.log(error);
    } 
  }, []);

  const handleSearchByCategory = async (id) => {
    try {
          const getProduct = async () => {
            const response = await axios.get(
              serverUrl + `/api/product/filter_product?rating=4&category_id=${id}`
            );
            const data = response?.data;
            if (data?.success) {
              setProducts(data?.products);
            }
          };
          getProduct();

  } catch (error) {
    toast.error(error?.response?.data?.message)
    } 
}


  const PopularProductNavigation = () => {
    const categories = useSelector((state) => state?.ecommerce?.categories);

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    // bind navigation after refs are ready
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





    return (
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category?._id}>
              <div className=" flex justify-center items-center h-8" data-aos='fade-left'>
                <div className="text-center ">
                  <div className=" relative max-w-14  overflow-hidden group mx-auto">
                    <span
                    onClick={()=>handleSearchByCategory(category?._id)}
                      className="hover:text-orange-500 capitalize cursor-pointer text-xs">
                      {category?.name}
                    </span>
                    <span className=" w-18 bottom-0 -left-20 group-hover:left-0 duration-300 absolute h-[1px] bg-orange-500"></span>
                  </div>{" "}
                </div>
              </div>{" "}
            </SwiperSlide>
          ))}

          <button
            ref={prevRef}
            disabled={isBeginning}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10  text-xs  rounded-full  
            ${
              isBeginning
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-orange-500 text-black"
            }`}
          >
            <FaChevronLeft />
          </button>

          <button
            ref={nextRef}
            disabled={isEnd}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10  text-xs  rounded-full  
            ${
              isEnd
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-orange-500 text-black"
            }`}
          >
            <FaChevronRight />
          </button>
        </Swiper>
      </div>
    );
  };

  // bind navigation after refs are ready
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

  return (
    <div className="">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 animatedTextColor">
          Popular Products
        </h2>
        <p className="text-orange-500 mt-2 text-sm sm:text-base">
          Discover our most popular items loved by thousands of customers.
        </p>
      </div>
      <div className=" mb-3 w-sm mx-auto">
        <PopularProductNavigation />
      </div>
      <>
        {!products?.length ? (
          <div
            data-aos="fade-up"
            className=" flex gap-3 flex-wrap h-40 overflow-hidden justify-around mb-2"
          >
            <div className=" border h-40 bg-zinc-300 w-50 flex justify-between flex-col rounded-sm border-gray-300 animate-pulse">
              <div className="  h-30 flex-1  bg-white/50 m-0.5">
                <div className="w-full h-full relative">
                  <FaImage className=" absolute w-full opacity-20 h-full top-0 left-0" />
                </div>
              </div>
              <div className=" flex items-center mx-2 gap-1">
                <div className="w-5 h-5 rounded-full bg-gray-400" />
                <div className="w-5 h-5 rounded-full bg-gray-400" />
                <div className="h-3 w-[50%]  bg-zinc-400 my-2 rounded-full"></div>
              </div>
              <div className="h-3 w-[80%] bg-zinc-400 mt-1 mx-2 rounded-full"></div>
              <div className="h-3 rounded-full bg-zinc-400 mx-2 my-2"></div>
            </div>
            <div className=" border h-40 bg-zinc-300 w-50 flex justify-between flex-col rounded-sm border-gray-300 animate-pulse">
              <div className="  h-30 flex-1  bg-white/50 m-0.5">
                <div className="w-full h-full relative">
                  <FaImage className=" absolute w-full opacity-20 h-full top-0 left-0" />
                </div>
              </div>
              <div className=" flex items-center mx-2 gap-1">
                <div className="w-5 h-5 rounded-full bg-gray-400" />
                <div className="w-5 h-5 rounded-full bg-gray-400" />
                <div className="h-3 w-[50%]  bg-zinc-400 my-2 rounded-full"></div>
              </div>
              <div className="h-3 w-[80%] bg-zinc-400 mt-1 mx-2 rounded-full"></div>
              <div className="h-3 rounded-full bg-zinc-400 mx-2 my-2"></div>
            </div>
            <div className=" border h-40 bg-zinc-300 w-50 flex justify-between flex-col rounded-sm border-gray-300 animate-pulse">
              <div className="  h-30 flex-1  bg-white/50 m-0.5">
                <div className="w-full h-full relative">
                  <FaImage className=" absolute w-full opacity-20 h-full top-0 left-0" />
                </div>
              </div>
              <div className=" flex items-center mx-2 gap-1">
                <div className="w-5 h-5 rounded-full bg-gray-400" />
                <div className="w-5 h-5 rounded-full bg-gray-400" />
                <div className="h-3 w-[50%]  bg-zinc-400 my-2 rounded-full"></div>
              </div>
              <div className="h-3 w-[80%] bg-zinc-400 mt-1 mx-2 rounded-full"></div>
              <div className="h-3 rounded-full bg-zinc-400 mx-2 my-2"></div>
            </div>
            <div className=" border h-40 bg-zinc-300 w-50 flex justify-between flex-col rounded-sm border-gray-300 animate-pulse">
              <div className="  h-30 flex-1  bg-white/50 m-0.5">
                <div className="w-full h-full relative">
                  <FaImage className=" absolute w-full opacity-20 h-full top-0 left-0" />
                </div>
              </div>
              <div className=" flex items-center mx-2 gap-1">
                <div className="w-5 h-5 rounded-full bg-gray-400" />
                <div className="w-5 h-5 rounded-full bg-gray-400" />
                <div className="h-3 w-[50%]  bg-zinc-400 my-2 rounded-full"></div>
              </div>
              <div className="h-3 w-[80%] bg-zinc-400 mt-1 mx-2 rounded-full"></div>
              <div className="h-3 rounded-full bg-zinc-400 mx-2 my-2"></div>
            </div>
            <div className=" border h-40 bg-zinc-300 w-50 flex justify-between flex-col rounded-sm border-gray-300 animate-pulse">
              <div className="  h-30 flex-1  bg-white/50 m-0.5">
                <div className="w-full h-full relative">
                  <FaImage className=" absolute w-full opacity-20 h-full top-0 left-0" />
                </div>
              </div>
              <div className=" flex items-center mx-2 gap-1">
                <div className="w-5 h-5 rounded-full bg-gray-400" />
                <div className="w-5 h-5 rounded-full bg-gray-400" />
                <div className="h-3 w-[50%]  bg-zinc-400 my-2 rounded-full"></div>
              </div>
              <div className="h-3 w-[80%] bg-zinc-400 mt-1 mx-2 rounded-full"></div>
              <div className="h-3 rounded-full bg-zinc-400 mx-2 my-2"></div>
            </div>
            <div className=" border h-40 bg-zinc-300 w-50 flex justify-between flex-col rounded-sm border-gray-300 animate-pulse">
              <div className="  h-30 flex-1  bg-white/50 m-0.5">
                <div className="w-full h-full relative">
                  <FaImage className=" absolute w-full opacity-20 h-full top-0 left-0" />
                </div>
              </div>
              <div className=" flex items-center mx-2 gap-1">
                <div className="w-5 h-5 rounded-full bg-gray-400" />
                <div className="w-5 h-5 rounded-full bg-gray-400" />
                <div className="h-3 w-[50%]  bg-zinc-400 my-2 rounded-full"></div>
              </div>
              <div className="h-3 w-[80%] bg-zinc-400 mt-1 mx-2 rounded-full"></div>
              <div className="h-3 rounded-full bg-zinc-400 mx-2 my-2"></div>
            </div>
          </div>
        ) : (
          <>
            {products?.length > 0 && (
              <div className="relative" data-aos="fade-up">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
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
                    0: { slidesPerView: 2 },
                    600: { slidesPerView: 3 },
                    940: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                  }}
                >
                  {products.map((product) => (
                    <SwiperSlide key={product._id}>
                      <div className="mb-5 mt-2 h-56" key={product._id}>
                        <div className="border border-gray-300 shadow-xs hover:scale-105 group hover:shadow-sm h-full m-auto w-45  md:w-55 duration-300 overflow-hidden rounded-t-sm bg-gray-100">
                          <div className=" w-full h-24 m-auto relative overflow-hidden flex items-center justify-center">
                            <Link to={`/product/${product?._id}`}>
                              <LazyLoadImage
                                src={product?.images[0]}
                                alt={"product image"}
                                className="w-24 h-24 object-contain border transition-all group-hover:scale-110 duration-500 opacity-10 group-hover:opacity-0"
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
                              <h1 className={"text-xs "}>
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
    </div>
  );
};

export default BestSeller;
