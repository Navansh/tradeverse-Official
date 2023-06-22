import { product } from "@/assets";
import Image from "next/image";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { useTradeContext } from "@/context";

type Props = {
  image: any[];
  title: string;
  price: string;
  location: string;
  isSellerActive: boolean;
};

interface Type {
  item: Props;
}

const ProductCard = ({ item }: Type) => {
  const { handleAddToCart } = useTradeContext();
  const main = item.image[0]
  return (
    <div className="border-2 cursor-pointer border-Gray/900 mt-9 px-3 py-2.5 max-w-[308px]">
      <div className="relative">
        
        <Image
          src={main}
          alt="product"
          className="max-w-[278px] max-h-[278px] object-cover rounded-[4px]"
        />
        {item.isSellerActive && (
          <button className="absolute top-0 animate-pulse transition-all duration-500 bg-[#F90000] right-0 text-center flex items-center space-x-6 px-5 py-2.5">
            <span>Seller is Live</span>
            <FaChevronRight />
          </button>
        )}
      </div>

      <div className="flex border-b-2 border-Foundation pb-3 flex-col mt-4 items-start w-full text-start">
        <span>{item.title}</span>
        <h3>{item.price}</h3>
        <div className="flex items-center text-center space-x-1">
          <BsDot className="text-green text-xl" />
          <span className="text-[14px] font-medium">{item.location}</span>
        </div>
      </div>
      <div className="flex items-center justify-center mt-6 space-x-6 w-full">
        <Link href={`/product/${item.title}`}>
          <button className="border-2 border-green text-[18px] font-bold px-8 py-2.5 rounded-[48px]">
            Buy
          </button>
        </Link>
        <button
          onClick={() => handleAddToCart(item)}
          className="bg-green text-[18px] font-bold px-4 py-2.5 rounded-[48px]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
