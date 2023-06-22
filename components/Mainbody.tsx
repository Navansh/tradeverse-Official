import { product, profile } from "@/assets";
import Image from "next/image";
import React from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import { products } from "@/constant";

const Mainbody = () => {
  
  return (
    <div className="flex-1 h-screen pb-[30px] mx-9 flex flex-col items-start mt-9">
      <div className="flex border-b-2 border-Foundation w-full py-6 items-center">
        <button className="border border-green px-5 py-2.5 rounded-[48px] flex items-center space-x-3">
          <Image src={profile} alt="profile" />
          <span className="text-[14px] font-bold text-[#fff]">
            Anima <span className="font-normal">is hosting a live Video</span>
          </span>
          <FaMicrophoneAlt size={25} className="text-Foundation" />
        </button>
      </div>

      {/** product */}
      <div className="border-b-2 border-Foundation flex !flex-wrap items-start justify-start gap-12 pb-24 w-ful">
        {products.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
      </div>

      <div className="border-b-2 border-Foundation flex !flex-wrap items-start justify-start gap-12 pb-24 w-ful">
        {products.map((item, i) => (
          <CategoryCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Mainbody;
