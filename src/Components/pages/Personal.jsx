import React, { useRef, useState } from "react";
import Container from "../Container";
import ReactImageZoom from "react-image-zoom";
import InnerImageZoom from "react-inner-image-zoom";
import Button from "@mui/material/Button";
import { RiAccountCircleFill, RiLogoutBoxRFill } from "react-icons/ri";
import { IoBagCheck } from "react-icons/io5";
import { RiLoader2Line } from "react-icons/ri";
import { FaImagePortrait } from "react-icons/fa6";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import SignIn from "./Signin";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../config/ServerUrl";
import toast from "react-hot-toast";
import { logout } from "../../redux/E-commerce_trunk";
import { user_info } from "../../redux/EcommerceSlice";


const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state?.ecommerce?.token);
  const personal_details = useSelector((state) => state?.ecommerce?.user_info);
  const fileInputRef = useRef(null);
   const [loading, setLoading] = useState(false);

  const handleImageClick = () => {
    if (loading) return;
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      setLoading(true);
      const response = await axios.post(
        serverUrl + "/api/user/user_profile_image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.success) {
        dispatch(user_info(response?.data?.data));
        setLoading(false);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message)
      console.error("Upload failed:", err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {token ? (
        <div className="  pb-5">
          <h1 className=" text-center font-bold uppercase p-3">my profile</h1>
          <Container className={"flex "}>
            <div className="max-w-[30%] min-w-[30%] bg-zinc-100 border mr-1 border-gray-300 customshadow">
              <div className=" w-full py-2 border-b border-gray-300 bg-white">
                <div className=" max-h-20 min-h-20 min-w-20 max-w-20 rounded-full border border-gray-500 overflow-hidden mx-auto">
                  <div
                    onClick={handleImageClick}
                    className={`max-h-20 min-h-20 min-w-20 max-w-20 rounded-full relative flex  cursor-pointer overflow-hidden ${
                      loading
                        ? "opacity-70 pointer-events-none"
                        : "hover:shadow-md"
                    }`}
                  >
                    {personal_details?.profile_image ? (
                      <img
                        src={personal_details?.profile_image}
                        alt="Selected"
                        className="max-h-20 min-h-20 min-w-20 max-w-20  rounded-full object-cover hover:opacity-70 bg-black"
                      />
                    ) : (
                      <div className="items-center justify-center hover:opacity-50  w-full h-full m-auto grid ">
                        <FaImagePortrait className=" text-gray-600 text-4xl " />
                        <p className="xsLight text-[7px]!">Upload image</p>
                      </div>
                    )}
                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
                        <div className="text-gray-700 text-sm">
                          <RiLoader2Line className=" text-3xl animate-spin" />
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>
                <h1 className=" font-semibold text-sm text-center m-1">
                  {personal_details?.name}
                </h1>
              </div>
              <NavLink
                to={"/personal/profile"}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <div className="flex items-center gap-2 p-1 bg-gray-100 cursor-pointer my-1 relative">
                  <span className=" absolute top-0 left-0 w-[1px] h-full bg-orange-500 opacity-0 link-text" />
                  <RiAccountCircleFill
                    className={`                text-lg link-text text-blue-500`}
                  />
                  <Button className=" text-xs! md:text-sm! capitalize!">
                    Profile
                  </Button>
                </div>
              </NavLink>

              <NavLink
                to={"/personal/order"}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <div className="flex items-center gap-2 p-1 bg-gray-100 cursor-pointer my-1 relative">
                  <span className=" absolute top-0 left-0 w-[1px] h-full bg-orange-500 opacity-0 link-text" />
                  <IoBagCheck className={`text-lg link-text text-blue-500`} />
                  <Button className=" text-xs! md:text-sm! capitalize!">
                    Orders
                  </Button>
                </div>
              </NavLink>
              <div>
                <div
                  onClick={() => (dispatch(logout()), navigate("/"))}
                  className="flex items-center gap-2 p-1 bg-gray-100 cursor-pointer my-1 relative"
                >
                  <span className=" absolute top-0 left-0 w-[1px] h-full bg-orange-500 opacity-0 link-text" />
                  <RiLogoutBoxRFill
                    className={`
                text-lg link-text text-blue-500`}
                  />
                  <Button className=" text-xs! md:text-sm! capitalize!">
                    Log out
                  </Button>
                </div>
              </div>

            </div>
            <Outlet />
          </Container>
        </div>
      ) : (
        <SignIn state={{ from: location }} />
      )}
    </>
  );
};

export default Profile;
