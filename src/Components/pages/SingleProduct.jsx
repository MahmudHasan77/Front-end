import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../config/ServerUrl.js";
import { toast } from "react-toastify";
import Container from "./../Container";
import Loading from "../Loading.jsx";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css"; // <-- Ensure this import
import { GrStorage } from "react-icons/gr";
import { IoPricetags } from "react-icons/io5";
import { CiDiscount1 } from "react-icons/ci";
import HotelClassIcon from "@mui/icons-material/HotelClass";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import { TbCategory } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import { WiTime11 } from "react-icons/wi";
import Rating from "../Rating";
import RelatedProduct from "./../RelatedProduct";
import ProductDetails from "./../ProductDetails";
import {MdOutlineKeyboardArrowDown,MdOutlineKeyboardArrowUp} from "react-icons/md";
import AddToCardBtn from "../AddToCardBtn.jsx";
import PriceFormatter from './../PriceFormatter';
import { CgSmartphoneRam } from "react-icons/cg";



const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const thumbRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
const [relatedLoading,setRelatedLoading]=useState(false)
  const checkScrollButtons = () => {
    const container = thumbRef.current;
    if (!container) return;

    setCanScrollUp(container.scrollTop > 0);
    setCanScrollDown(
      container.scrollTop + container.clientHeight < container.scrollHeight
    );
  };
  const scrollThumbnails = (direction) => {
    const container = thumbRef.current;
    const scrollAmount = 100;

    if (direction === "up") {
      container.scrollBy({ top: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }

    // Delay checking scroll until after scroll animation
    setTimeout(checkScrollButtons, 300);
  };

  useEffect(() => {
    checkScrollButtons(); // Initial check
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${serverUrl}/api/product/get_single_product/${id}`
        );
        const data = response?.data;
        if (data.success) {
          setProduct(data.product);
          setSelectedImage(data.product?.images?.[0]);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();




    const fetchingRelatedProduct = async () => {
      try {
              setRelatedLoading(true);
              const response = await axios.get(
                `${serverUrl}/api/product/get_product_by_type_id/${product?.type_id}`
              );
              const data = response?.data;
              if (data.success) {
                setRelatedProduct(data?.products);

              } else {
                toast.error(data?.message);
              }
            } catch (error) {
              console.log(error);
      } finally {
        setRelatedLoading(false);
            }
    }
    fetchingRelatedProduct()


  }, [id, product?.type_id]);

  const calculateDiscount = (oldPrice, newPrice) => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };


  const price_formatter = (amount) => {
    return (
      new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(amount)
    )
  }

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        product && (
          <>
            <div className="flex flex-col md:flex-row my-5 gap-4">
              {/* Image Section */}
              <div className="flex gap-4 border border-gray-300 p-2">
                {/* Thumbnails */}
                <div className="flex gap-4 items-start">
                  {/* Thumbnail Slider */}
                  <div className="relative flex flex-col items-center w-24">
                    <button
                      onClick={() => scrollThumbnails("up")}
                      className="bg-gray-800 text-white px-2 py-0.5 rounded mb-1 disabled:opacity-50 "
                      disabled={!canScrollUp}
                    >
                      <MdOutlineKeyboardArrowUp />
                    </button>
                    <div
                      ref={thumbRef}
                      onScroll={checkScrollButtons}
                      className="overflow-y-auto max-h-[300px] border overflow-hidden border-gray-300 hiddenScroll rounded"
                    >
                      {product?.images?.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Thumbnail ${index}`}
                          onClick={() => setSelectedImage(img)}
                          className={`w-full h-20 object-cover cursor-pointer p-1 ${
                            selectedImage === img
                              ? "border rounded-sm border-blue-500"
                              : ""
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => scrollThumbnails("down")}
                      className="bg-gray-800 text-white px-2 py-0.5 rounded mt-1 disabled:opacity-50"
                      disabled={!canScrollDown}
                    >
                      <MdOutlineKeyboardArrowDown />
                    </button>
                  </div>

                  {/* Main Image */}
                </div>
                <div className="max-w-70 w-full flex justify-center items-center">
                  <Zoom zoomMargin={40} overlayBgColorEnd="rgba(0,0,0,0.9)">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full h-70 object-contain rounded-md cursor-zoom-in border border-gray-300"
                      style={{ maxHeight: "280px" }}
                    />
                  </Zoom>
                </div>
              </div>

              {/* Product Info Section */}
              <div className="flex-1 p-2 flex flex-col gap-3">
                <h1 className="font-semibold text-sm">{product?.name}</h1>

                <div className="flex items-center gap-3">
                  <CgSmartphoneRam className="text-orange-500 text-lg" />
                  <h1 className="font-semibold text-sm">RAM:</h1>
                  <span className="text-sm font-semibold">{product?.ram}</span>
                </div>

                <div className="flex items-center gap-3">
                  <GrStorage className="text-orange-500 text-lg" />
                  <h1 className="font-semibold text-sm">Storage:</h1>
                  <span className="text-sm font-semibold">{product?.storage}</span>
                </div>

                <div className="flex items-center gap-3">
                  <IoPricetags className="text-orange-500 text-lg" />
                  <h1 className="font-semibold text-sm">Old Price:</h1>
                  <span className="text-sm">
                    {price_formatter(product?.old_price)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <IoPricetags className="text-orange-500 text-lg" />
                  <h1 className="font-semibold text-sm">Price:</h1>
                  <span className=" text-sm text-orange-700">
                    {<PriceFormatter product={product} />}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CiDiscount1 className="text-orange-500 text-lg" />
                  <h1 className="font-semibold text-sm">Discount:</h1>
                  <p className="text-sm text-orange-600">
                    {calculateDiscount(product.old_price, product?.price)}%
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <HotelClassIcon className="text-orange-500 text-lg -ml-1" />
                  <h1 className="font-semibold text-sm">Rating:</h1>
                  <Rating rating={product.rating} />
                </div>

                <div className="flex items-center gap-3">
                  <BrandingWatermarkIcon className="text-orange-500 text-lg" />
                  <h1 className="font-semibold text-sm">Brand:</h1>
                  <p className="text-sm">{product.brand}</p>
                </div>

                <div className="flex items-center gap-3">
                  <TbCategory className="text-orange-500 text-lg" />
                  <h1 className="font-semibold text-sm">Category:</h1>
                  <p className="text-sm">{product.category_name}</p>
                </div>

                {product.count_in_stock ? (
                  <div className="flex items-center gap-3">
                    <GoDotFill className="text-green-500 text-2xl" />
                    <p className="text-sm">
                      In Stock ({product.count_in_stock})
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <GoDotFill className="text-red-600 text-2xl" />
                    <p className="text-sm">Out of Stock</p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <WiTime11 className="text-orange-500 text-lg" />
                  <h1 className="font-semibold text-sm">Published:</h1>
                  <p className="text-sm">
                    {product?.createdAt
                      ? product.createdAt.split("T")[0]
                      : "N/A"}
                  </p>
                </div>

                <div className="w-[30%]">
                  <AddToCardBtn product={product} />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="my-5">
              <p className="font-bold px-2">Product Details</p>
              <ProductDetails
                product={product}
id={id}              />
            </div>
            {/* Related Product Section Placeholder */}
            <div className="my-5">
              <p className="font-bold px-2">Related Products</p>
              <RelatedProduct
                products={relatedProduct}
                relatedLoading={relatedLoading}
              />
            </div>
          </>
        )
      )}
    </Container>
  );
};

export default SingleProduct;
