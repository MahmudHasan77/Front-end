import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import ShowProductsInGridView from "./ShowProductsInGridView";
import ShowProductsInListView from "./ShowProductsInListView";
import { useLocation } from "react-router-dom";
import { BiLoader } from "react-icons/bi";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { IconButton } from "@mui/material";
import { FiFilter } from "react-icons/fi";
import { BiFilter } from "react-icons/bi";
import { serverUrl } from "../../../config/ServerUrl";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState();
  const [isLoading, setLoading] = useState(false);
  const category_list = useSelector((state) => state?.ecommerce?.categories);
  const [openType, setOpenType] = useState("");
  const [prices, setPrice] = useState([0, 10000]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [page, setPage] = useState(1);
  const [viewProducts, setViewProducts] = useState("grid");
  const params = new URLSearchParams(useLocation().search);
  const categoryID = params.get("category_id");
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState();
  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  const search = useSelector((state) => state?.ecommerce?.searchValue);
  const handleCheckboxChange = (e, state, setState) => {
    const value = e.target.value;
    if (e.target.checked) {
      setState([...state, value]);
    } else {
      setState(state.filter((item) => item !== value));
    }
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  useEffect(() => {
    if (categoryID && !categories.includes(categoryID)) {
      setCategories((prev) => [...prev, categoryID]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ categoryID]);

  useEffect(() => {
    // const controller = new AbortController();
    const fetchingData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          serverUrl+`/api/product/filter_product_with_pagination?page=${page}&sort=${sort}&search=${search}`,
          {
            categories,
            types,
            ratings,
            prices,
          },
          // { signal: controller.signal }
        );
        const data = response?.data;
        setProducts(data?.products);
        setProductData(data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchingData();

    return () => {
      // controller.abort(); // Cleanup:  request cancel 
    };
  }, [prices, categories, ratings, types, page, sort, search]);

  const handleOpenTypeClick = (id) => {
    if (id == openType) {
      setOpenType("");
    } else {
      setOpenType(id);
    }
  };

  const Checkbox_for_categories = () => {
    return (
      <div>
        <div>
          <div className="text-xs h-50 overflow-y-auto styleScrollbar gap-2 my-2 grid border bg-white customshadow border-zinc-50">
            {category_list?.map((category) => {
              return (
                <div key={category?._id} className=" grid justify-between capitalize">
                  <div className="flex flex-col items-center justify-between cursor-pointer hover:text-orange-500 ">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={categories.includes(category?._id)}
                          value={category?._id}
                          onChange={(e) =>
                            handleCheckboxChange(e, categories, setCategories)
                          }
                          size="small"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 17,
                            },
                          }}
                        />
                      }
                      label={
                        <Button
                          style={{ fontSize: "9px" }}
                          onClick={() => handleOpenTypeClick(category?._id)}
                          className=" capitalize!"
                        >
                          {`${category?.name}`}
                        </Button>
                      }
                    />
                    <span>
                      {category?.children?.length > 0 && (
                        <>
                          {openType == category?._id ? (
                            <RiArrowUpWideLine className=" -mt-2.5 text-blue-500" />
                          ) : (
                            <RiArrowDownWideLine className=" -mt-2.5 text-blue-500" />
                          )}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="">
                    {category?.children?.length > 0 && (
                      <>
                        <Collapse isOpened={openType === category?._id}>
                          <div className="border border-gray-300  px-2 w-full">
                            {category?.children?.map((type) => {
                              return (
                                <span key={type?._id} className=" flex items-center cursor-pointer hover:text-orange-500 justify-between my-1 py-1 text-[10px]">
                                  <input
                                    checked={types.includes(type?._id)}
                                    value={type?._id}
                                    type="checkbox"
                                    className=" border"
                                    onChange={(e) =>
                                      handleCheckboxChange(e, types, setTypes)
                                    }
                                  />
                                  <label className="">{type?.name}</label>
                                </span>
                              );
                            })}
                          </div>
                        </Collapse>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>{" "}
      </div>
    );
  };

  const ShopPageHeader = () => {
    return (
      <div className="shoppinText text-center py-3">
        <h1 className="text-2xl font-bold text-orange-400">
          Welcome to Our Shop
        </h1>

        <div className="w-24 h-[1px] bg-orange-500 mt-4 mx-auto rounded-full" />
      </div>
    );
  };

  return (
    <div className="">
      <ShopPageHeader />
      {/* header  */}
      <div className=" flex  bg-zinc-50 h-10 w-full items-center border border-green-200">
        <div className=" flex items-center min-w-[33%] max-w-[33%] md:min-w-[20%] md:max-w-[20%] bg-zinc-100 border border-gray-300 px-1 h-full text-center">
          <p className=" font-bold m-auto h-full w-ful pt-2 text-xs md:text-[15px]">
            Filter
          </p>
          <IconButton
            onClick={toggleDrawer}
            className=" border! text-sm! bg-green-100! border-green-300!"
          >
            <FiFilter />
          </IconButton>
        </div>

        <div className=" flex justify-between  flex-1  h-full items-center font-bold text-xs">
          {/* AlignProduct */}
          <>
            <div className="flex justify-between h-full items-center msx-w-10! md:w-30 md:justify-around gap-1 pl-2">
              <button
                className={`${
                  viewProducts === "grid"
                    ? " text-gray-900! h-5! "
                    : "text-gray-500! h-5! "
                } group relative overflow-hidden w-[21px] cursor-pointer`}
                onClick={() => setViewProducts("grid")}
              >
                <IoGrid className="text-lg md:text-[20px] absolute top-0 group-hover:top-6 duration-300" />
                <IoGrid className="text-lg md:text-[20px] absolute -top-6 group-hover:top-0 duration-300" />
              </button>
              <button
                color=""
                className={`${
                  viewProducts === "list"
                    ? " text-gray-900! h-5! "
                    : "text-gray-500! h-5! "
                } group relative overflow-hidden w-[21px] cursor-pointer`}
                onClick={() => setViewProducts("list")}
              >
                <FaThList className="text-lg md:text-[20px] absolute top-0 group-hover:top-6 duration-300" />
                <FaThList className="text-lg md:text-[20px] absolute -top-6 group-hover:top-0 duration-300" />
              </button>{" "}
            </div>
          </>
          {/* AlignProduct */}
          <div className="hidden md:inline">
            {products?.length == 0 ? (
              <div>
                <p>{`There is no product`}</p>
              </div>
            ) : products?.length == 1 ? (
              <div>
                <p>{`There is 1 product`}</p>
              </div>
            ) : (
              <div>
                <p>{`There are ${products?.length} products`}</p>
              </div>
            )}
          </div>
          {/* SortingProduct */}
          <div className="relative w-25">
            <select
              onChange={(e) => setSort(e.target.value)}
              className="w-full border py-1 pl-3 pr-8 border-gray-300 outline-none appearance-none"
            >
              <option>Sort By</option>
              <option value={"descending"}>High To Low</option>
              <option value={"ascending"}>Low To High</option>
            </select>
            <BiFilter className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          {/* SortingProduct */}
        </div>
      </div>

      <div className={"flex"}>
        {/* filter products */}

        <div className="relative h-full">
          {/* Drawer Box */}
          <div
            className={`fixed left-0 top-16 bottom-0 z-50 transition-transform duration-300 ease-in-out filterScrollbar
   ${open ? "translate-x-0" : "-translate-x-full"}
    w-[80vw] sm:w-[60vw] md:w-[40vw] max-w-xs bg-white shadow-lg overflow-y-auto`}
          >
            {/* Drawer Content */}
            <div className="p-1 flex justify-around items-center">
              <h1 className=" font-bold text-orange-800">FILTER PRODUCTS</h1>

              <IconButton
                onClick={toggleDrawer}
                className=" px-4 py-2 bg-green-100! border! border-green-300!"
              >
                <MdOutlineKeyboardDoubleArrowLeft />
              </IconButton>
            </div>

            <>
              <div className=" border border-gray-300  my-1 h-auto bg-zinc-50 px-1">
                <div className="flex justify-center my-2 md:mx-5 items-center bg-zinc-100 py-2">
                  <button className=" font-semibold text-sm text-orange-500">
                    Categories
                  </button>
                </div>

                <div className="bg-white ml-[5%] shadow ">
                  <Checkbox_for_categories />
                </div>

                {/* filter by prices */}
                <div className="  py-3">
                  <h1 className="font-bold text-xs px-2 pt-1">
                    Filter by Price
                  </h1>
                  <div className=" flex justify-around items-center py-2">
                    <div className="flex justify-between items-center text-[11px] pt-0.5 flex-1">
                      <span>from $ {prices[0]}</span>
                      <span className="px-1 md:px-2">to</span>
                      <span>$ {prices[1]}</span>
                    </div>
                  </div>
                  <div className=" flex-1 ">
                    <RangeSlider
                      min={0}
                      max={10000}
                      step={5}
                      value={prices}
                      onInput={handlePriceChange}
                    />
                  </div>
                </div>
                {/* filter by prices */}
                {/* filter by ratings */}
                <div className="pt-2">
                  <h1 className=" font-bold text-xs px-2 py-2">
                    Filter by Rating
                  </h1>
                  <Box className="grid px-2 md:px-3">
                    <div className=" flex items-center ">
                      <Checkbox
                        value={5}
                        onChange={(e) =>
                          handleCheckboxChange(e, ratings, setRatings)
                        }
                        size="small"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 17,
                          },
                        }}
                      />
                      <Rating
                        name="read-only"
                        value={5}
                        readOnly
                        size="small"
                      />
                    </div>

                    <div className=" flex items-center ">
                      <Checkbox
                        value={4}
                        onChange={(e) =>
                          handleCheckboxChange(e, ratings, setRatings)
                        }
                        size="small"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 17,
                          },
                        }}
                      />
                      <Rating
                        name="read-only"
                        value={4}
                        readOnly
                        size="small"
                      />
                    </div>

                    <div className=" flex items-center ">
                      <Checkbox
                        value={3}
                        onChange={(e) =>
                          handleCheckboxChange(e, ratings, setRatings)
                        }
                        size="small"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 17,
                          },
                        }}
                      />
                      <Rating
                        name="read-only"
                        value={3}
                        readOnly
                        size="small"
                      />
                    </div>

                    <div className=" flex items-center ">
                      <Checkbox
                        value={2}
                        onChange={(e) =>
                          handleCheckboxChange(e, ratings, setRatings)
                        }
                        size="small"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 17,
                          },
                        }}
                      />
                      <Rating
                        name="read-only"
                        value={2}
                        readOnly
                        size="small"
                      />
                    </div>

                    <div className=" flex items-center ">
                      <Checkbox
                        value={1}
                        onChange={(e) =>
                          handleCheckboxChange(e, ratings, setRatings)
                        }
                        size="small"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 17,
                          },
                        }}
                      />
                      <Rating
                        name="read-only"
                        value={1}
                        readOnly
                        size="small"
                      />
                    </div>
                  </Box>
                </div>
                {/* filter by ratings */}
              </div>
            </>
          </div>
        </div>

        {/* filter products */}

        {/* pagination */}
        <div className=" flex-1">
          {/* show products  */}
          {isLoading ? (
            <>
              <div className="relative w-[90%] mx-auto my-5 h-40 md:h-60 border bg-black/80 flex flex-col justify-around px-5 animate-pulse">
                <div className="w-[50%] h-3 bg-white/10"></div>
                <div className="w-[70%] h-3 bg-white/10"></div>

                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">
                  <BiLoader className=" animate-spin" />
                </span>

                <div className="w-[60%] h-3 bg-white/10"></div>
                <div className="w-[90%] h-3 bg-white/10"></div>
                <div className="w-[80%] h-3 bg-white/10"></div>
                <div className="w-[100%] h-3 bg-white/10"></div>
              </div>
              <div className="relative w-[90%] mx-auto my-5 h-40 md:h-60 border bg-black/80 flex flex-col justify-around px-5 animate-pulse">
                <div className="w-[50%] h-3 bg-white/10"></div>
                <div className="w-[70%] h-3 bg-white/10"></div>

                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">
                  <BiLoader className=" animate-spin" />
                </span>

                <div className="w-[60%] h-3 bg-white/10"></div>
                <div className="w-[90%] h-3 bg-white/10"></div>
                <div className="w-[80%] h-3 bg-white/10"></div>
                <div className="w-[100%] h-3 bg-white/10"></div>
              </div>
            </>
          ) : (
            <>
              <>
                {viewProducts == "grid" ? (
                  <>
                    <ShowProductsInGridView products={products} />
                  </>
                ) : (
                  <>
                    <ShowProductsInListView products={products} />
                  </>
                )}
              </>
              {/* pagination  */}
              <div className=" flex justify-center">
                <div className=" font-semibold text-sm">
                  <div className=" md:hidden my-2">
                    {products?.length == 0 ? (
                      <p>No product </p>
                    ) : (
                      <p>{productData?.showing}</p>
                    )}
                  </div>

                  <Pagination
                    count={productData?.total_pages}
                    page={page} // ✅ Add this line
                    variant="outlined"
                    onChange={(e, v) => setPage(v)}
                    color="secondary"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        {/* pagination */}
      </div>
    </div>
  );
};

export default Shop;
