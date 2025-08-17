import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RiMenu5Fill } from "react-icons/ri";
import { MdOutlineDoubleArrow } from "react-icons/md";
const UnderNavigation = () => {
  const [open, setOpen] = useState(false);
  const category_list = useSelector((state) => state?.ecommerce?.categories);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <div className=" font-bold text-sm">
        <div className="flex justify-around my-2 border-b border-orange-500">
          <Link to={"/"}>
            <img
              className="w-7 h-auto mx-2 object-contain"
              src={
                "https://res.cloudinary.com/dpf3ipd7p/image/upload/v1755021253/ecommerce_logo-removebg-preview_lewgsl.png"
              }
              alt="Logo"
            />
          </Link>
          <MdOutlineDoubleArrow
            className=" my-auto hover:text-red-600 cursor-pointer rotate-180 text-xl"
            onClick={toggleDrawer(false)}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mx-7">
            <button className=" text-orange-800">Product Categories</button>
          </div>
          <div>
            <div className="text-xs pl-5 h-50 overflow-y-auto styleScrollbar gap-2 my-2 grid border bg-white customshadow border-zinc-50">
              {category_list?.map((category) => {
                return (
                  <div className="  capitalize  grid">
                    <Link
                      to={`/shop?category_id=${category._id}`}
                      className="flex items-center justify-between cursor-pointer hover:text-orange-500 my-1"
                    >
                      {category?.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {/* <button className=" p-5" >SHOP BY CATEGORY</button> */}
      <div
        onClick={toggleDrawer(true)}
        className=" relative cursor-pointer  text-center"
      >
        <RiMenu5Fill className=" text-xl text-orange-500" />
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
        <div className="p-2 my-3 grid gap-3">
          <p className=" font-bold  text-center text-orange-800">Pages</p>
          <span className="  pl-[7%]" onClick={toggleDrawer(false)}>
            <Link
              to={"/personal/profile"}
              className=" hover:text-orange-500 font-semibold text-sm"
            >
              Profile
            </Link>
          </span>
          <span className="  pl-[7%]" onClick={toggleDrawer(false)}>
            <Link
              to={"/about"}
              className=" hover:text-orange-500 font-semibold text-sm"
            >
              About Us
            </Link>
          </span>
          <span className="  pl-[7%]" onClick={toggleDrawer(false)}>
            <Link
              to={"/contact"}
              className=" hover:text-orange-500 font-semibold text-sm"
            >
              Contact Us
            </Link>
          </span>
        </div>
      </Drawer>
    </div>
  );
};

export default UnderNavigation;
