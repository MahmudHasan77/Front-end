import React, { useEffect, useState, useCallback } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import HotelClassIcon from "@mui/icons-material/HotelClass";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "./../config/ServerUrl";
import { useSelector } from "react-redux";
import { LuLoaderCircle } from "react-icons/lu";
import DOMPurify from "dompurify";

const ProductDetails = ({ product, id }) => {
  const [isOpen, setOpen] = useState("details");
  const token = useSelector((state) => state?.ecommerce?.token);
  const inputRef = useRef();
  const [orders, setOrders] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [productReviews, setProductReviews] = useState([]);
  const [isAllowedToReview, setAllowedToReview] = useState(false);

useEffect(() => {
  if (orders?.length > 0) {
    const deliveredOrders = orders.filter(
      (order) => order?.order_status === "Delivered"
    );
    const allowed = deliveredOrders.some((order) =>
      order?.product?.some((prod) => prod?._id === id)
    );
    setAllowedToReview(allowed);
  } else {
    setAllowedToReview(false);
  }
}, [orders, id]);

   

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const fetchingReview = useCallback(async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/product/get_review/${id}`
      );
      const data = response?.data;
      if (data.success) {
        setProductReviews(data?.reviews);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchingReview();
  }, [fetchingReview]);

  useEffect(() => {
    const fetchingOrders = async () => {
      try {
        const response = await axios.get(serverUrl + "/api/order/get_orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response?.data;
        setOrders(data?.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingOrders();
  }, [token]);

  const [images, setImages] = useState([]);

  const [image_url, set_image_url] = useState([]);
  const [reviewData, setReviewData] = useState({
    review: "",
    product_id: product?._id,
    rating: "",
  });

  const handleImageChange = (e) => {
    for (const image of e.target.files) {
      setImages((prev) => [...prev, image]);
      set_image_url((prev) => [...prev, URL.createObjectURL(image)]);
    }
  };

  const handleRemoveImage = (img, index) => {
    const new_url = image_url.filter((url) => url !== img);
    set_image_url(new_url);
    const newImage = images.filter((_, ind) => ind !== index);
    setImages(newImage);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      if (reviewData.review == "") {
        return toast.error("Please write comment");
      }
      setReviewLoading(true);
      const formData = new FormData();
      formData.append("review", reviewData.review);
      formData.append("product_id", reviewData.product_id);
      formData.append("rating", reviewData.rating);
      images.forEach((img) => {
        formData.append("images", img);
      });

      const response = await axios.post(
        serverUrl + "/api/product/add_review",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response?.data;
      if (data.success) {
        fetchingReview();
        toast.success("your review added successfully");
        setImages([]);
        set_image_url([]);
        setReviewData({ review: "", product_id: "", rating: "" });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setReviewLoading(false);
    }
  };

  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, review) => sum + review.rating, 0) /
        productReviews.length
      : 0;

  return (
    <>
      <div className="w-full h-full b-zinc-50 bg-white border border-gray-300">
        <div className="flex  gap-1 md:gap-3 lg:gap-5 justify-around md:justify-start font-bold text-sm md:text-[16px] h-10 bg-zinc-50 md:h-12 border-b border-gray-300">
          <button
            onClick={() => setOpen("details")}
            className={` ${
              isOpen === "details" && " border-orange-400"
            } border-b border-gray-100 hover:border-gray-300  px-3 m-1`}
          >
            Product Description
          </button>
          <button
            onClick={() => setOpen("reviews")}
            className={` ${
              isOpen === "reviews" && " border-orange-400"
            } border-b border-gray-100 hover:border-gray-300  px-3 m-1`}
          >
            Product Reviews
          </button>
        </div>
        <div>
          {isOpen === "details" ? (
            <div className=" bg-white  text-[12px] md:text-sm p-3 md:p-5 font-extralight leading-5 md:leading-6">
              <div
                className=" p-3"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              ></div>
            </div>
          ) : (
            <div>
              <p className="p-1 font-semibold text-center">Ratings & Reviews</p>
              <div className=" bg-white  flex justify-around md:justify-start p-5 md:gap-20">
                <div className="flex flex-col justify-center">
                  <HotelClassIcon className=" text-orange-500" />
                  <p className="my-5 font-bold text-xl">
                    <span>{averageRating.toFixed(1)}</span>/5
                  </p>
                  <p className=" font-extralight text-xs">
                    {productReviews?.length} Reviews
                  </p>
                </div>
                <div className="">
                  <Box className="grid ">
                    <div className=" flex items-center gap-3 md:gap-5">
                      <Rating
                        name="read-only"
                        value={5}
                        readOnly
                        size="small"
                      />
                      <span className=" font-extralight text-xs md:text-sm">
                        (
                        {productReviews?.length > 0
                          ? productReviews?.filter(
                              (review) => review?.rating == 5
                            ).length
                          : 0}
                        )
                      </span>
                    </div>
                    <div className=" flex items-center gap-3 md:gap-5">
                      <Rating
                        name="read-only"
                        value={4}
                        readOnly
                        size="small"
                      />
                      <span className=" font-extralight text-xs md:text-sm">
                        (
                        {productReviews?.length > 0
                          ? productReviews?.filter(
                              (review) => review?.rating == 4
                            ).length
                          : 0}
                        )
                      </span>
                    </div>
                    <div className=" flex items-center gap-3 md:gap-5">
                      <Rating
                        name="read-only"
                        value={3}
                        readOnly
                        size="small"
                      />
                      <span className=" font-extralight text-xs md:text-sm">
                        (
                        {productReviews?.length > 0
                          ? productReviews?.filter(
                              (review) => review?.rating == 3
                            ).length
                          : 0}
                        )
                      </span>
                    </div>
                    <div className=" flex items-center gap-3 md:gap-5">
                      <Rating
                        name="read-only"
                        value={2}
                        readOnly
                        size="small"
                      />
                      <span className=" font-extralight text-xs md:text-sm">
                        (
                        {productReviews?.length > 0
                          ? productReviews?.filter(
                              (review) => review?.rating == 2
                            ).length
                          : 0}
                        )
                      </span>
                    </div>
                    <div className=" flex items-center gap-3 md:gap-5">
                      <Rating
                        name="read-only"
                        value={1}
                        readOnly
                        size="small"
                      />
                      <span className=" font-extralight text-xs md:text-sm">
                        (
                        {productReviews?.length > 0
                          ? productReviews?.filter(
                              (review) => review?.rating == 1
                            ).length
                          : 0}
                        )
                      </span>
                    </div>
                  </Box>

                  {/* <Box className="md:grid px-2 md:px-3 hidden">
                    <div className=" flex items-center gap-3 md:gap-5">
                      <Rating
                        name="read-only"
                        value={5}
                        readOnly
                        size="small"
                      />
                      <span className=" font-extralight text-xs md:text-sm">
                        (100)
                      </span>
                    </div>{" "}
                    <div className=" flex items-center gap-3 md:gap-5">
                      <Rating
                        name="read-only"
                        value={4}
                        readOnly
                        size="small"
                      />
                      <span className=" font-extralight text-xs md:text-sm">
                        (100)
                      </span>
                    </div>{" "}
                    <div className=" flex items-center gap-3 md:gap-5">
                      <Rating
                        name="read-only"
                        value={3}
                        readOnly
                        size="small"
                      />
                      <span className=" font-extralight text-xs md:text-sm">
                        (100)
                      </span>
                    </div>{" "}
                    <div className=" flex items-center gap-3 md:gap-5">
                      <Rating
                        name="read-only"
                        value={2}
                        readOnly
                        size="small"
                      />
                      <span className=" font-extralight text-xs md:text-sm">
                        (100)
                      </span>
                    </div>{" "}
                    <div className=" flex items-center gap-3 md:gap-5">
                      <Rating
                        name="read-only"
                        value={1}
                        readOnly
                        size="small"
                      />
                      <span className=" font-extralight text-xs md:text-sm">
                        (100)
                      </span>
                    </div>
                  </Box> */}
                </div>
              </div>

              {/* add review  */}
              {isAllowedToReview && (
                <div className="border border-zinc-100  overflow-y-aut p-5 my-3 bg-gray-50 rounded-sm">
                  <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmitReview}
                  >
                    <TextField
                      id="outlined-multiline-static"
                      label="Write review here.."
                      value={reviewData.review}
                      onChange={(e) =>
                        setReviewData({ ...reviewData, review: e.target.value })
                      }
                      multiline
                      rows={5}
                      className=" w-[307px] md:w-sm lg:w-md "
                    />
                    <Rating
                      name="half-rating"
                      defaultValue={0}
                      onChange={(e) =>
                        setReviewData({ ...reviewData, rating: e.target.value })
                      }
                    />
                    <div className=" flex flex-wrap gap-2">
                      {image_url?.map((img, index) => (
                        <div
                          key={index}
                          className=" w-20 h-20 border border-green-300 relative "
                          onClick={handleImageClick}
                        >
                          <img
                            className=" w-20 h-20 object-contain"
                            src={img}
                          />
                          <span className=" absolute top-0 ">
                            <TiDeleteOutline
                              className="cursor-pointer hover:text-red-500"
                              onClick={(e) => {
                                e.stopPropagation(),
                                  handleRemoveImage(img, index);
                              }}
                            />
                          </span>
                        </div>
                      ))}
                      <div
                        className=" w-20 h-20 border border-green-300 relative cursor-pointer"
                        onClick={handleImageClick}
                      >
                        <span className=" absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl opacity-50">
                          <IoCloudUploadOutline />
                        </span>
                        <span className=" absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs opacity-50">
                          upload image
                        </span>
                      </div>
                      <input
                        onChange={handleImageChange}
                        multiple
                        type="file"
                        ref={inputRef}
                        className="hidden"
                      />
                    </div>
                    <div>
                      <button
                        disabled={reviewLoading}
                        type="submit"
                        className=" relative font-semibold bg-orange-400 py-1 px-5 md:py-2 w-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {reviewLoading && (
                          <LuLoaderCircle className=" absolute top-1/2 -translate-y-1/2 animate-spin" />
                        )}
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <>
                {productReviews?.length > 0 &&
                  productReviews?.map((review) => {
                    return (
                      <div
                        key={review?._id}
                        className=" border border-zinc-100 flex overflow-y-auto p-5 gap-[2%] my-3 bg-gray-50 rounded-sm"
                      >
                        <div className=" max-h-10 max-w-10 min-w-10 min-h-10 flex justify-center items-center rounded-full border border-gray-500 overflow-hidden">
                          {review?.user_id?.profile_image ? (
                            <img
                              className=" object-cover  h- w-full"
                              src={review?.user_id?.profile_image}
                            />
                          ) : (
                            <div className=" flex justify-center items-center">
                              <p>{review?.user_id?.name[0]}</p>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className=" font-semibold text-sm">
                            {review?.user_id?.name}
                          </p>
                          <p className=" font-extralight text-sm">
                            {review?.updatedAt.split("T")[0]}
                          </p>
                          <Rating
                            name="read-only"
                            value={review?.rating}
                            readOnly
                            size="small"
                          />
                          <div className=" flex flex-wrap gap-5">
                            {review?.images.length > 0 &&
                              review?.images?.map((img, index) => (
                                <img
                                  className="h-10 w-10 object-contain"
                                  key={index}
                                  src={img}
                                  alt="review image"
                                />
                              ))}
                          </div>
                          <p className=" font-extralight text-sm">
                            {review?.review}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
