import { product } from "@/assets";
import Image from "next/image";
import React from "react";
import { FaChevronRight} from 'react-icons/fa'

const CategoryCard = () => {
  return (
    <div>
      <div className="w-[310px] h-[310px] cursor-pointer bg-[#fff] space-y-7 rounded-[8px] mt-6 flex flex-col py-2.5 px-8 items-center">
        <span className="text-[18px] font-bold  text-[#000] text-center border-b-2 border-[#000] w-full">Rolex</span>
        <Image
          src={product}
          alt="product"
          className="w-[160px] h-[160px] object-cover"
        />
        <div className="flex items-center text-[#007FF4] text-center space-x-4">
            <span className="text-[14px] font-medium">Browse Product</span>
            <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
