import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "./../config/ServerUrl";
import { toast } from "react-hot-toast";
import DOMPurify from "dompurify";
import truncate from "html-truncate";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import  AOS  from 'aos';

const Blog = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
  AOS.init()
},[])
  useEffect(() => {
    const fetching = async () => {
      const response = await axios.get(serverUrl + "/api/blog/get_blog");
      const data = response?.data;
      if (data?.success) {
        setBlogs(data?.blogs);
      } else {
        toast.error(data?.message);
      }
    };
    fetching();
  }, []);

  const TrunkText = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  const cleanTruncate = (html, length) => {
    const cut_code = truncate(html, length)
    const safe_code = DOMPurify.sanitize(cut_code)
    return safe_code
}
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
    <div className="relative px-1">
      <div className="ml-5 pt-7">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 animatedTextColor">
          Latest from Our Blog
        </h2>
      </div>
      {blogs?.length > 0 && (
        <Swiper
          breakpoints={{
            0: { slidesPerView: 2.3 },
            600: { slidesPerView: 3 },
            940: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
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
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <div
                data-aos="fade-down"
                className=" bg-zinc-100 text-gray-600 overflow-hidden   border border-gray-300"
              >
                <div className=" w-50 h-50  md:max-w-55 md:h-55">
                  <div>
                    {/* <img
                      className="  w-50 h-30 object-cover"
                      src={blog?.image}
                    /> */}

                    <LazyLoadImage
                      src={blog?.image}
                      className="  w-50 h-30 object-cover"
                      alt="blog image"
                      effect="blur"
                      placeholderSrc="https://res.cloudinary.com/dpf3ipd7p/image/upload/v1755093621/blur-white_fskalg.jpg"
                    />
                  </div>
                  <div className=" font-semibold text-xs">
                    {TrunkText(blog?.title, 25)}
                  </div>
                  <div
                    className=" text-[2px]! px-1"
                    dangerouslySetInnerHTML={{
                      __html: cleanTruncate(blog?.description, 50),
                    }}
                  ></div>
                </div>
                <Link
                  to={"/single_blog"}
                  state={blog}
                  className="text-orange-500 px-1 text-xs"
                >
                  Learn more{" "}
                </Link>
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
      )}
    </div>
  );
};

export default Blog;
