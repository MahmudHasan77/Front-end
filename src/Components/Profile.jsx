/* eslint-disable react-hooks/exhaustive-deps */
import { FaUserEdit } from "react-icons/fa";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { serverUrl } from "./../config/ServerUrl";
import { useDispatch } from "react-redux";
import { user_address } from "../redux/EcommerceSlice";
import { AiTwotoneDelete } from "react-icons/ai";

const Profile = () => {
  const token = useSelector((state) => state.ecommerce.token);
  const user_address_details = useSelector(
    (state) => state.ecommerce.user_address
  );
  const dispatch = useDispatch();
  const [selectedAddressId, setSelectedAddressId] = useState();
  const [delete_loading, set_delete_loading] = useState("");
  const handle_radio_change = async (e) => {
    setSelectedAddressId(e);
    try {
      const response = await axios.post(
        serverUrl + `/api/address/select_address/${e}`,
        e,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response?.data;
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetching_address = async () => {
      try {
        const response = await axios.get(
          serverUrl + "/api/address/get_all_address",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fetchedAddresses = response?.data?.addresses;
        dispatch(user_address(fetchedAddresses));

        const activeAddress = fetchedAddresses?.find(
          (addr) => addr.status === true
        );
        if (activeAddress) {
          setSelectedAddressId(activeAddress._id);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    };
    fetching_address();
  }, []);

  const handle_remove_click = async (id) => {
    try {
      set_delete_loading(id);
      const delete_address = await axios.delete(
        serverUrl + `/api/address/delete_address/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = delete_address?.data;
      console.log(data);
      if (data?.message) {
        const response = await axios.get(
          serverUrl + "/api/address/get_all_address",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fetchedAddresses = response?.data?.addresses;
        dispatch(user_address(fetchedAddresses));

        const activeAddress = fetchedAddresses?.find(
          (addr) => addr.status === true
        );
        if (activeAddress) {
          setSelectedAddressId(activeAddress._id);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      set_delete_loading("");
    }
  };

  const [open_details, set_open_details] = useState(false);

  const user_info = useSelector((state) => state?.ecommerce?.user_info);

  return (
    <div className=" w-full">
      <div className=" bg-gray200">

        <div className=" border  border-gray-300 p-2 bg-white">
          <div className="flex justify-around items-center m-5 border h-8 border-gray-300">
            <div
              className={`${
                open_details
                  ? " "
                  : "border-b border-orange-500 text-orange-500"
              } flex justify-center items-center gap-2 cursor-pointer h-full`}
              onClick={() => set_open_details(false)}
            >
              <FaUserAlt />
              <p className=" font-semibold text-sm">Profile</p>
            </div>
            <div
              className={`${
                open_details
                  ? " border-b border-orange-500 text-orange-500"
                  : ""
              } flex justify-center items-center gap-2 cursor-pointer h-full`}
              onClick={() => set_open_details(true)}
            >
              <FaAddressCard />
              <p className=" font-semibold text-sm">Address</p>
            </div>
          </div>
        </div>
      </div>
      {open_details ? (
        <div>
          <div className=" border flex-1 bg-zinc-50 border-gray-300">
            {user_address_details?.map((address, index) => {
              return (
                <div
                  key={index}
                  className=" flex  items-center justify-center gap-1 border bg-white customshadow1 p-2 border-gray-300 mt-5"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className=" w-5">
                      <FormControlLabel
                        value={address?._id}
                        control={
                          <Radio
                            checked={selectedAddressId === address._id}
                            onChange={() => handle_radio_change(address?._id)}
                          />
                        }
                      />
                    </div>
                    <div>
                      {delete_loading == address._id ? (
                        <BiLoaderCircle className=" text-xl animate-spin text-red-500 bg-gray-200 rounded-full cursor-pointer" />
                      ) : (
                        <AiTwotoneDelete
                          className=" text-xl hover:text-red-500 bg-gray-200 rounded-full cursor-pointer"
                          onClick={() => handle_remove_click(address._id)}
                        />
                      )}
                    </div>
                  </div>
                  <div className=" flex flex-wrap items-center justify-center">
                    <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                      address line :{" "}
                    </h1>
                    <p className=" text-[10px]">{address?.address_line},</p>
                    <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                      country :{" "}
                    </h1>
                    <p className=" text-[10px]">{address?.country},</p>
                    <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                      city :{" "}
                    </h1>
                    <p className=" text-[10px]">{address?.city},</p>
                    <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                      PINcode :{" "}
                    </h1>
                    <p className=" text-[10px]">{address?.PINcode},</p>
                    <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                      state:{" "}
                    </h1>
                    <p className=" text-[10px]">{address?.state},</p>
                    <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                      status :
                    </h1>
                    <p className=" text-[10px]">{address?.status},</p>
                    <h1 className=" capitalize font-semibold text-[10px] text-orange-500 ml-5">
                      mobile :{" "}
                    </h1>
                    <p className=" text-[10px]">{address?.mobile},</p>
                  </div>
                </div>
              );
            })}
            <Link to={"/personal/Add_address"}>
              <button className=" text-center w-full border my-5 border-dashed p-1 bg-green-50 border-gray-400 cursor-pointer">
                Add Address
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className=" border flex-1 bg-zinc-50 border-gray-300">
            <div className="flex items-center gap-3 mx-7 my-2 p-1 border-b border-gray-200 font-semibold text-sm">
              <h1 className=" font-bold">
                NAME : <span className=" text-xs">{user_info?.name}</span>
              </h1>
            </div>
            <div className="flex items-center gap-3 mx-7 my-2 p-1 border-b border-gray-200 font-semibold text-sm">
              <h1 className=" font-bold">
                EMAIL : <span className=" text-xs">{user_info?.email}</span>
              </h1>
            </div>
            <div className="flex items-center gap-3 mx-7 my-2 p-1 border-b border-gray-200 font-semibold text-sm">
              <h1 className=" font-bold">MOBILE :</h1>
              <span className=" text-xs">{user_info?.mobile}</span>
            </div>

            <Link to={"/personal/editProfile"}>
              <div className=" flex hover:text-orange-500 duration-300 items-center font-semibold text-sm justify-around bg-gray-300 my-5 mx-10 p-1 cursor-pointer">
                <p>Edit Profile</p>
                <FaUserEdit className="text-lg" />
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
