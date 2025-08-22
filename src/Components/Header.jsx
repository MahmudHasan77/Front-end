import { useEffect, useRef } from "react";
import SearchInput from "./SearchInput";
import { Link, useNavigate } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import SideNavigation from "./SideNavigation";
import { useDispatch, useSelector } from "react-redux";
import SideCart from "./SideCart";
import { IoBagCheck } from "react-icons/io5";
import { RiLogoutBoxRFill } from "react-icons/ri";
import axios from "axios";
import { serverUrl } from "../config/ServerUrl";
import { logout } from "../redux/E-commerce_trunk";
import { categories, searchValue, user_info } from "../redux/EcommerceSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";
import { RiHome9Fill } from "react-icons/ri";

const Header = () => {
  const token = useSelector((state) => state?.ecommerce?.token);
  const personal_details = useSelector((state) => state?.ecommerce?.user_info);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) return;

    const fetching_data = async () => {
      try {
        const response = await axios.get(
          serverUrl + "/api/user/personal_details",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response?.data;
        if (data?.success) {
          dispatch(user_info(data?.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetching_data();
  }, [token, dispatch]);

  const navigate = useNavigate();
  const [isProfileBoxOpen, setProfileBoxOpen] = useState(false);

  // click out side
  const boxRef = useRef(null);
  const buttonRef = useRef(null);

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
    function handleClickOutside(event) {
      if (boxRef.current && boxRef.current.contains(event.target)) {
        return;
      }

      if (buttonRef.current && buttonRef.current.contains(event.target)) {
        return;
      }

      setProfileBoxOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);
  // click out side
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/shop");
    }
  };
  return (
    <>
      <div className="relative bg-gray-100">
        {/* Top Heading */}

          <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 border-b border-gray-300 h-11 pt-[2px]">
            <div className="flex items-center md:gap-x-10 justify-between">
              <Link to={"/"}>
                <img
                  className="w-7 h-auto mx-2 object-contain"
                  src={
                    "https://res.cloudinary.com/dpf3ipd7p/image/upload/v1755021253/ecommerce_logo-removebg-preview_lewgsl.png"
                  }
                  alt="Logo"
                />
              </Link>

              <div className=" hidden md:inline flex-1">
                <SearchInput />
              </div>

              <div className=" flex justify-center md:hidden relative flex-1 mt-0.5 rounded mr-1 h-7 border overflow-hidden  border-gray-300">
                <input
                  onChange={(e) => dispatch(searchValue(e.target.value))}
                  onKeyDown={handleKeyDown}
                type="search"
                placeholder="Search..."
                  className=" outline-none   text-center h-full  w-full bg-white/50 text-sm"
                />
                <div
                  className=" border-l bg-gray-100  w-7 border-gray-200"
                  onClick={() => navigate("/shop")}
                >
                  <FcSearch className=" absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer" />
                </div>
              </div>

              {/* sign in  */}
              {token ? (
                <div className=" text-[10px] md:flex  justify-center items-center text-gray-600 hidden flex-col">
                  <Link
                    to={"personal/profile"}
                    className=" hover:text-gray-950 text-orange-500"
                  >
                    {personal_details?.name}
                  </Link>

                  <Link
                    to={"personal/profile"}
                    className=" hover:text-gray-950 text-orange-500"
                  >
                    {personal_details?.email}
                  </Link>
                </div>
              ) : (
                <div className=" text-sm text-gray-600 hidden md:inline ">
                  <Link to={"/signIn"} className=" hover:text-gray-950">
                    Sign In{" "}
                  </Link>
                  <span> / </span>
                  <Link to={"/signup"} className=" hover:text-gray-950">
                    Sign Up
                  </Link>
                </div>
              )}

              <div className="flex gap-2 items-center lg:gap-10 text-sm uppercase font-medium text-lightText">
                <div className=" mt-2 hidden md:inline">
                  <SideCart />
                </div>
                {/* profile box  */}

                <div className=" relative hidden md:inline">
                  <div
                    ref={buttonRef}
                    onClick={() => setProfileBoxOpen(!isProfileBoxOpen)}
                    className="text-[18px] cursor-pointer text-gray-600 hover:text-gray-950 duration-300 mb-[-3px] "
                  >
                    <div>
                      {personal_details ? (
                        <div>
                          {personal_details?.profile_image ? (
                            <div className="h-[23px] w-[23px] rounded-full border border-orange-500 overflow-hidden">
                              <img
                                className="h-full w-full object-cover"
                                src={personal_details?.profile_image}
                                alt="Profile"
                              />
                            </div>
                          ) : (
                            <span className=" border border-orange-500 cursor-pointer rounded-full p-1.5 min-h-[23px] min-w-[23px] max-h-[23px] max-w-[23px] flex justify-center items-center">
                              <span className=" text-center text-sm font-bold text-orange-500">
                                <span>{personal_details?.name[0]}</span>
                              </span>
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="h-[23px] rotate-2 w-[23px] rounded-full border border-orange-500 overflow-hidden">
                          <img
                            src="https://res.cloudinary.com/dpf3ipd7p/image/upload/v1755785792/profile_image_rb0bn3.jpg"
                            alt="profile image"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {isProfileBoxOpen && (
                    <div
                      ref={boxRef}
                      className="absolute z-50 top-9 right-0 border border-gray-400 h-30 w-30 bg-white shadow"
                    >
                      <div className="h-3 w-3 bg-white border border-gray-400 absolute right-2 -top-1 rotate-45 z-0"></div>
                      <div className="relative h-full z-10   bg-white">
                        <div className=" p-1 flex gap-2 items-center border-b border-gray-300">
                          <div className=" flex justify-center items-center max-h-7 max-w-7 min-h-7 min-w-7 rounded-full border border-orange-500 overflow-hidden">
                            {personal_details?.profile_image ? (
                              <img
                                className=" object-cover w-full"
                                src={personal_details?.profile_image}
                              />
                            ) : (
                              <span className=" font-bold text-orange-500">
                                {personal_details?.name[0]}
                              </span>
                            )}
                          </div>
                          <div>
                            {token ? (
                              <div className="  text-orange-500">
                                <p className="xsLight text-[7px]!">
                                  {personal_details?.name}
                                </p>
                              </div>
                            ) : (
                              <p className="xsLight text-[7px]!">
                                your not logged in
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <Link
                            onClick={() => setProfileBoxOpen(false)}
                            className="flex items-center gap-3 m-1"
                            to={"personal/profile"}
                            tabIndex={isProfileBoxOpen ? 0 : -1}
                          >
                            <RiAccountCircleFill className=" text-[18px] text-orange-500" />
                            <span className=" text-[11px] text-gray-900 capitalize">
                              My Profile
                            </span>
                          </Link>
                        </div>

                        <div>
                          <Link
                            className="flex items-center gap-3 mx-1 my-2"
                            to={"/personal/order"}
                            onClick={() => setProfileBoxOpen(!isProfileBoxOpen)}
                          >
                            <IoBagCheck className=" text-[17px] text-orange-500" />
                            <span className=" text-[11px] text-gray-900 capitalize">
                              My Orders
                            </span>
                          </Link>
                        </div>
                        <div>
                          {token ? (
                            <span
                              onClick={() => (
                                navigate("/"),
                                setProfileBoxOpen(!isProfileBoxOpen),
                                localStorage.removeItem("token"),
                                dispatch(logout())
                              )}
                              className="flex items-center gap-3 m-1 cursor-pointer"
                            >
                              <RiLogoutBoxRFill className=" text-[18px] text-orange-500" />
                              <span className=" text-[11px] text-gray-900 capitalize">
                                log out
                              </span>
                            </span>
                          ) : (
                            <span
                              onClick={() => (
                                navigate("/signIn"),
                                setProfileBoxOpen(!isProfileBoxOpen)
                              )}
                              className="flex items-center gap-3 m-1 cursor-pointer"
                            >
                              <RiLogoutBoxRFill className=" text-[18px] text-orange-500" />
                              <span className=" text-[11px] text-gray-900 capitalize">
                                log In
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* profile box  */}

                <div className=" ">
                  <SideNavigation />
                </div>
              </div>
            </div>
          </header>

        {/* bottom heading  */}
        <footer
          className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white shadow-inner border-t border-gray-200 h-9 flex items-center justify-center
    transform will-change-transform"
        >
          <div className=" w-full z-50">
            <div className="flex items-center justify-around  rounded-sm  h-9 px-2 bg-white">
              <Link to={"/"}>
                <span className="text-gray-700 hover:text-gray-950 ">
                  <RiHome9Fill className="text-2xl" />
                </span>
              </Link>
              <div className="max-w-5 mt-2">
                <SideCart />
              </div>

              <Link to={"personal/profile"}>
                <div className="text-[18px] cursor-pointer text-gray-600 hover:text-gray-950 duration-300">
                  <div>
                    {personal_details ? (
                      <div>
                        {personal_details?.profile_image ? (
                          <div className="h-[23px] w-[23px] rounded-full border border-gray-500 overflow-hidden">
                            <img
                              className="h-full w-full object-cover"
                              src={personal_details?.profile_image}
                              alt="Profile"
                            />
                          </div>
                        ) : (
                          <span className=" border border-gray-500 cursor-pointer rounded-full p-1.5 min-h-[23px] min-w-[23px] max-h-[23px] max-w-[23px] flex justify-center items-center">
                            <span className=" text-center text-sm font-bold text-orange-500">
                              <span>{personal_details?.name[0]}</span>
                            </span>
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="h-[23px] rotate-2 w-[23px] rounded-full border border-gray-500 overflow-hidden">
                        <img
                          src="https://res.cloudinary.com/dpf3ipd7p/image/upload/v1755785792/profile_image_rb0bn3.jpg"
                          alt="profile image"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Header;
