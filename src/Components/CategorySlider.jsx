import Container from "./Container";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import { TbTruckDelivery } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategorySlider = () => {
  const category_list = useSelector((state) => state?.ecommerce?.categories);
  return (
    <Container className={" my-5"}>
      <div className=" bg-fuchsia-500 flex text-[11px] md:text-[15px] justify-around items-center my-3 font-bold border border-orange-300  py-3 capitalize text-white!">
        <div className="flex justify-around gap-3 items-center">
          <TbTruckDelivery className="text-lg " />
          <p className="hidden md:inline">FREE ...</p>
        </div>
        <p className=" ">free delivery now on your first order</p>
        <p>- only $200*</p>
      </div>

      <div className="text-center my-5">
        <h2 className="text-[20px] font-bold animatedTextColor h-11 py-2 w-45 px-30 rounded-xs  mx-auto relative overflow-hidden">
          <span className={` absolute categoryC`}>C</span>
          <span className={`categoryA absolute`}>A</span>
          <span className={`categoryT absolute`}>T</span>
          <span className={`categoryE absolute`}>E</span>
          <span className={`categoryG absolute`}>G</span>
          <span className={`categoryO absolute`}>O</span>
          <span className={`categoryR absolute`}>R</span>
          <span className={`categoryI absolute`}>I</span>
          <span className={`categoryE2 absolute`}>E</span>
          <span className={`categoryS absolute`}>S</span>
        </h2>
      </div>

      <Splide
        options={{
          type: "loop",
          autoScroll: {
            pauseOnHover: true,
            pauseOnFocus: true,
            rewind: true,
            speed: 1,
          },
          arrows: false,
          pagination: false,
          fixedWidth: "100px",
          gap: "12px",
        }}
        extensions={{ AutoScroll }}
      >
        {category_list?.map((category) => {
          return (
            <SplideSlide key={category?._id}>
              <div className="rounded-full h-15 w-15  mx-auto  overflow-hidden relative">
                <Link to={`/shop?category_id=${category._id}`}>
                  <img src={category?.image} className=" m-auto w-15 h-15" />
                </Link>
              </div>
              <div className="text-orange-500 text-sm  mx-auto text-center">
                {category?.name}
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </Container>
  );
};

export default CategorySlider;
