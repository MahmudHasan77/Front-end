import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import { useEffect } from "react";
import  axios  from 'axios';
import { serverUrl } from "../config/ServerUrl";
import { useDispatch, useSelector } from 'react-redux';
import { categories } from "../redux/EcommerceSlice";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

import "swiper/css";

import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";


const HeaderNavigation = () => {
  const dispatch = useDispatch();
  const category_list =useSelector((state) => state?.ecommerce?.categories) || [];
  useEffect(() => {
    const fetching = async () => {
      const response = await axios.get(
        serverUrl + "/api/category/get_categories"
      );
      const data = response?.data;
      if (data?.success) {
        dispatch(categories(data?.categories));
      } else {
        toast.error(data?.message);
      }
    };
    fetching();
  }, [dispatch]);


  const CategoryNavigation = () => {

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
      <>
        {category_list?.length > 0 && (
          <div className="relative w-[250px] mx-auto sm:w-sm md:w-md lg:w-3xl">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={4}
              breakpoints={{
                0: { slidesPerView: 4 },
                600: { slidesPerView: 5 },
                940: { slidesPerView: 5 },
                1024: { slidesPerView:7 },
              }}
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
              {category_list?.map((category) => (
                <SwiperSlide key={category?._id}>
                  <div className=" flex justify-center items-center">
                    <div className="text-center ">
                        <Link to={`/shop?category_id=${category._id}`} className="hover:text-orange-500  capitalize cursor-pointer text-[11px]">
                      <div className=" relative max-w14  overflow-hidden group mx-auto pb-0.5">
                          {category?.name}
                        <span className=" w-full bottom-0 -left-20 group-hover:left-0 duration-300 absolute h-[1px] bg-orange-500"></span>
                      </div>
                        </Link>
                    </div>
                  </div>{" "}
                </SwiperSlide>
              ))}

              <button
                ref={prevRef}
                disabled={isBeginning}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10  text-xs  bg-white p-2  hidden md:inline
            ${
              isBeginning
                ? "cursor-not-allowed bg-white text-gray-400"
                : "hover:text-orange-500 text-black"
            }`}
              >
                <FaChevronLeft />
              </button>

              <button
                ref={nextRef}
                disabled={isEnd}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10  text-xs   bg-white  p-2 hidden md:inline
            ${
              isEnd
                ? " cursor-not-allowed bg-white text-gray-400"
                : "hover:text-orange-500 text-black"
            }`}
              >
                <FaChevronRight />
              </button>
            </Swiper>
          </div>
        )}
      </>
    );
  };


  return (
    <>
      <div className="flex justify-between items-center">

        <CategoryNavigation />

        <div className="ml-1 ! min-w-25 pr-1 flex items-center justify-between">
          <GoRocket className="top-0.5 text-red-600" />
          <p className="text-[12px] mt-0.5 font-bold animatedTextColor">
            Free Delivery
          </p>
        </div>
      </div>
    </>
  );
};

export default HeaderNavigation;
