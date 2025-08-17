import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import axios from "axios";
import { serverUrl } from "../config/ServerUrl";
import { LuLoader } from "react-icons/lu";
import { Link } from "react-router-dom";
const HomeSlider = () => {
  const [isLoading, setLoading] = useState(false);
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    setLoading(true);
    const getProduct = async () => {
      try {
        const response = await axios.get(
          serverUrl + "/api/slider/get_home_slider"
        );
        const data = response?.data;
        if (data?.success) {
          setSliders(data?.sliders);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-[99%] mx-auto flex items-center justify-center bg-zinc-300 animate-pulse rounded-xs h-50 md:h-70 border border-gray-300">
          <LuLoader className=" -z-50 m-auto animate-spin" />
        </div>
      ) : (
        <>
          {sliders?.length > 0 && (
            <Swiper
              // style={{    height: '100%'
              // }}
              // effect="fade"
              modules={[Autoplay, EffectFade]}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={1000}
              loop={true}
              fadeEffect={{ crossFade: true }}
            >
              {sliders?.map((slider) => (
                <SwiperSlide key={slider?._id}>
                  <div className="relative">
                    <div className="w-full">
                      <img
                        className="w-full rounded-xs h-50 md:h-70 object-cover"
                        src={slider?.image}
                        alt={slider?.Title}
                      />
                    </div>
                    <div
                      className={`absolute top-1/2 transform -translate-y-1/2 ${slider?.TextAlign}-0 px-7 font-bold`}
                      style={{ color: slider?.TextColor }}
                    >
                      {slider?.Title}
                    </div>
                    <Link
                      to={"/shop"}
                      className="absolute border border-orange-500 bottom-10 left-1/2 transform -translate-x-1/2 bg-white/50 hover:bg-white px-2 rounded-xs text-sm py-1 cursor-pointer hover:text-orange-500 duration-300 animatedBgColor"
                    >
                      Shop Now
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </>
      )}
    </>
  );
};

export default HomeSlider;
