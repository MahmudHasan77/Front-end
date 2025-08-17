import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, EffectFade, Mousewheel } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "./../config/ServerUrl";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const SecondSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, offset: 100 });
  }, []);

  // Refresh AOS when sliders are updated
  useEffect(() => {
    if (sliders.length > 0) {
      AOS.refresh();
    }
  }, [sliders]);

  // Fetch sliders from backend
  useEffect(() => {
    const fetchingSlider = async () => {
      try {
        const response = await axios.get(
          serverUrl + "/api/slider/get_second_slider"
        );
        const data = response?.data;
        if (data?.success) {
          setSliders(data?.sliders);
        } else {
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchingSlider();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[240px] md:h-[300px] flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (sliders.length === 0) {
    return (
      <div className="w-full h-[240px] md:h-[300px] flex justify-center items-center">
        No sliders available
      </div>
    );
  }

  return (
    <div className="px-1 w-full flex justify-around items-center gap-1 my-2 overflow-hidden">
      {/* Horizontal Main Slider */}
      <div
        className="w-[70%] h-[150px] md:h-[200px] rounded-sm overflow-hidden"
        data-aos="fade-up"
      >
        <Swiper
          className="secondSlider"
          effect="fade"
          modules={[Autoplay, EffectFade]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          loop={true}
          fadeEffect={{ crossFade: true }}
        >
          {sliders.map((slider) => (
            <SwiperSlide key={slider._id}>
              <div className="relative w-full h-full">
                <img
                  src={slider?.image}
                  className="object-cover h-[150px] md:h-[200px] w-full rounded-sm"
                />
                <h1 className="text-center py-2 absolute secondSliderTitle secondSliderTitleColor rounded-sm px-2">
                  {slider?.title}
                </h1>
                <Link
                  to={`/shop?category_id=${slider?.category}`}
                  className="absolute secondSliderButton animatedBgSliderButton px-2 text-white rounded-sm"
                >
                  Shop Now
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Vertical Secondary Slider */}
      <div className="w-[30%] h-[150px] md:h-[200px]" data-aos='fade-left'>
        <Swiper
          direction="vertical"
          slidesPerView={1}
          spaceBetween={10}
          mousewheel={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          loop={true}
          modules={[Mousewheel, Autoplay]}
          className="h-full secondSlider2"
        >
          {sliders.map((slider) => (
            <SwiperSlide key={slider._id} className="h-full relative ">
              <img
                src={slider?.image}
                className="w-full h-[150px] md:h-[200px] object-cover rounded-sm"
              />
              <p className=" absolute left-1/2 -translate-1/2 secondSlider2Title opacity-50 rounded-sm px-5 text-xs text-white">
                {slider?.title}
              </p>
              <Link
                to={`/shop?category_id=${slider?.category}`}
                className="absolute secondSliderShopButton2 animatedBgSliderButton left-1/2 -translate-x-1/2 px-3 text-white rounded-sm text-center"
              >
                Shop
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SecondSlider;
