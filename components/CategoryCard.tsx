import { product } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

interface Message {
  id: string;
  profile: string;
  desc: string;
  location: string;
  cover: string;
  category: string;
  storeName: string;
}

const CategoryCard = ({
  category,
  cover,
  desc,
  id,
  location,
  profile,
  storeName,
}: Message) => {
  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }

    return text.slice(0, maxLength) + "...";
  }
  return (
    <div className="max-w-[310px] cursor-pointer mx-[16px] hover:scale-105 rounded-[8px] my-[16px] min-h-[352px] bg-[#fff]">
      <div className="relative">
        <Image
          src={`https://gateway.pinata.cloud/ipfs/${cover}`}
          alt="product"
          width={300}
          height={500}
          className="w-full h-[200px] overflow-hidden flex-shrink-0 shadow-md shadow-gray-600"
        />
        <Image
          src={`https://gateway.pinata.cloud/ipfs/${profile}`}
          alt="product"
          width={300}
          height={500}
          className="w-[48px] object-cover h-[48px] flex-shrink-0 rounded-full ring-2 ring-Gray/900 absolute top-[12px] left-[12px]"
        />
      </div>
      <div className="flex flex-col px-[16px] py-[16px] items-start space-y-[16px]">
        <h1 className="text-[24px] text-[#000] font-bold leading-normal">
          {storeName}
        </h1>
        <p className="text-[#000] w-[200px] text-[14px] font-normal leading-normal">
          {truncateText(desc, 80)}
        </p>
        <Link
          href={`/store/${storeName}`}
          className="text-[#007FF4] flex cursor-pointer items-center text-[14px] font-normal"
        >
          <span>Browse Product</span>
          <FaChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
