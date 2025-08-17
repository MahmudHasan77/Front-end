import { TbCategory } from "react-icons/tb";
import { IoPricetags } from "react-icons/io5";
import AddToCardBtn from "./AddToCardBtn";
import DescriptionIcon from "@mui/icons-material/Description";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import { GoDotFill } from "react-icons/go";
import HotelClassIcon from "@mui/icons-material/HotelClass";
import ProductRating from "./Rating";
import PriceFormatter from "./PriceFormatter";
import truncate from "html-truncate";
import DOMPurify from "dompurify";

const SingleProductInfo = ({ product }) => {
  return (
    <div className="flex flex-col gap-1  justify-between h-full">
      <div>
        <h1 className={"text-sm "}>{product?.name}</h1>
      </div>

      <div className="text-[11px]  text-gray-600">
        <span>{product?.ram}</span> /<span> {product?.storage}</span>
      </div>
      <div className=" flex items-center gap-3 text-sm text-orange-500">
        <IoPricetags className="text-blue-600 text-sm! md:text-[18px]! " />
        <PriceFormatter product={product} />
      </div>
      <div className=" flex items-center gap-3">
        <HotelClassIcon className=" text-indigo-700 text-[13px]! md:text-[20px]! " />
        <ProductRating rating={product?.rating} />
      </div>

      <div className=" flex items-center gap-3 ">
        <BrandingWatermarkIcon className=" text-indigo-700 text-[12px]! md:text-[18px]! " />
        <p className="text-sm">{product?.brand}</p>
      </div>
      <div className=" flex items-center gap-3 ">
        <TbCategory className=" text-indigo-700 text-[12px]! md:text-[18px]! " />
        <p className="text-sm">{product?.category_name}</p>
      </div>
      {product?.count_in_stock > 0 ? (
        <div className=" flex items-center gap-3 -ml-0.5">
          <GoDotFill className="text-green-500 text-[18px]! md:text-[22px]! " />
          <p className="text-sm">In Stock ({product?.count_in_stock})</p>
        </div>
      ) : (
        <div className=" flex items-center gap-3 -ml-0.5">
          <GoDotFill className="text-red-600 text-[15px]! md:text-[25px]! " />
          <p className="text-xs">Out of Stock</p>
        </div>
      )}
      <div className="flex items-center gap-3">
        <DescriptionIcon className=" text-indigo-700 text-sm! md:text-[20px]! " />
        <div
          dangerouslySetInnerHTML={{
            __html: truncate(DOMPurify.sanitize(product?.description), 50),
          }}
          className="text-sm text-gray-600"
        ></div>
      </div>

      <div>
        <AddToCardBtn
          product={product}
          className={
            "h-8 bg-orange-400 hover:bg-orange-700 text-lg my-5 w-40 md:w-50"
          }
        />
      </div>
    </div>
  );
};

export default SingleProductInfo;
