import React from "react";
import { VscChevronDown } from "react-icons/vsc";

const ProductBanner = ({itemsPerPageFromBanner}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div>Sorting Filter</div>
      <div className="text-sm flex items-center relative w-20">
        <label htmlFor="">Show</label>
        <select
          onChange={(e) => itemsPerPageFromBanner(e.target.value)}
          className="bg-gray-200 relative w-10 h-5 rounded-xs p-1 text-[10px] outline-none appearance-none"
        >
          <option value={"4"}>4</option>
          <option value={"8"}>8</option>
          <option value={"12"}>12</option>
        </select>
        <VscChevronDown className="absolute right-3 top-1 pointer-events-none" />
      </div>
    </div>
  );
};

export default ProductBanner;
