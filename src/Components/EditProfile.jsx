import Button from "@mui/material/Button";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "../config/ServerUrl";
import { user_info } from "../redux/EcommerceSlice";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const Profile = () => {
  const user_details = useSelector((state) => state?.ecommerce?.user_info);
  const token = useSelector((state) => state?.ecommerce?.token);
  const dispatch = useDispatch();
const navigate = useNavigate()

  const [form_data, set_form_data] = useState({
    name: user_details?.name,
    email: user_details?.email,
    mobile: "",
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const handleChange = (e) => {
    set_form_data({ ...form_data, [e.target.name]: e.target.value });
  };

  const handle_submit = async (e) => {
    e.preventDefault();
    if (form_data.NewPassword !== form_data.ConfirmPassword) {
      toast.error("New Password and Confirm Password should be same");
      return;
    }
    try {
      const response = await axios.post(
        serverUrl + "/api/user/update",
        form_data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response?.data.success) {
        dispatch(user_info(response?.data?.data));
        toast.success(response?.data?.message)
        navigate('/personal/profile')
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(error);
    }
  };

  return (
    <>
      <div className=" border flex-1 bg-zinc-50 border-gray-300 ">
        <form className=" grid" onSubmit={handle_submit}>
          <div className=" m-3 grid">
            <label htmlFor="name" className=" font-extralight text-sm">
              Full Name:
            </label>
            <input
              id="name"
              name="name"
              value={form_data.name}
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              className=" border border-gray-300 rounded-sm bg-white w-[90%] md:w-md outline-none p-1 text-sm"
            />
          </div>
          <div className=" m-3 grid">
            <label htmlFor="Email" className=" font-extralight text-sm">
              Email:
            </label>
            <input
              id="Email"
              name="email"
              onChange={handleChange}
              value={form_data.email}
              type="email"
              placeholder="Email"
              className=" border border-gray-300 rounded-sm bg-white w-[90%] md:w-md outline-none p-1  text-sm"
            />
          </div>

          {!user_details?.signUpWithGoogle && (
            <div className=" m-3 grid">
              <label htmlFor="OldPassword" className=" font-extralight text-sm">
                Old Password:
              </label>
              <input
                id="OldPassword"
                name="OldPassword"
                type="text"
                onChange={handleChange}
                placeholder="Old Password"
                className=" border border-gray-300 rounded-sm bg-white w-[90%] md:w-md outline-none p-1 text-sm"
              />
            </div>
          )}
          <div className=" m-3 grid">
            <label htmlFor="NewPassword" className=" font-extralight text-sm">
              New Password:
            </label>
            <input
              id="NewPassword"
              name="NewPassword"
              type="text"
              onChange={handleChange}
              placeholder="New Password"
              className=" border border-gray-300 rounded-sm bg-white w-[90%] md:w-md outline-none p-1 text-sm"
            />
          </div>
          <div className=" m-3 grid">
            <label
              htmlFor="ConfirmPassword"
              className=" font-extralight text-sm"
            >
              Confirm Password:
            </label>
            <input
              id="ConfirmPassword"
              name="ConfirmPassword"
              type="text"
              onChange={handleChange}
              placeholder="Confirm Password"
              className=" border border-gray-300 rounded-sm bg-white w-[90%] md:w-md outline-none p-1 text-sm"
            />
          </div>
          <div className=" m-3 grid">
            <label htmlFor="Mobile" className=" font-extralight text-sm">
              Mobile:
            </label>
            <div>
              <PhoneInput
                defaultCountry="bd"
                value={form_data.mobile}
                onChange={(phone) =>
                  set_form_data({ ...form_data, mobile: phone })
                }
              />
            </div>
          </div>
          <div className=" flex mx-5 gap-5">
            <Button
              className=" bg-orange-500! px-3! w-20! text-sm! text-white!"
              type="submit"
            >
              SAVE
            </Button>
            <Link to={"/personal/profile"}>
              <Button className=" bg-orange-500! px-3! w-20! text-sm! text-white!">
                CANCEL
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
