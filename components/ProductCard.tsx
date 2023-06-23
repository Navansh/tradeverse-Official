import { product } from "@/assets";
import Image from "next/image";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { useTradeContext } from "@/context";

interface Product {
  name: string;
  desc: string;
  image: never[];
  price: number;
  category: string;
  pid: number;
  quantity: number;
  location: string;
  max: number;
  owner: string;
  refund: number;
}
// interface Type {
//   item: Props;
// }

const ProductCard = ({
  image,
  location,
  price,
  category,
  desc,
  max,
  name,
  owner,
  pid,
  quantity,
  refund,
}: Product) => {
  const { handleAddToCart } = useTradeContext();
  //console.log(image[0])
  return (
    <div className="border-2 cursor-pointer border-Gray/900 mt-9 px-3 py-2.5 max-w-[308px]">
      <div className="relative">
      {image?.length > 0 && (
        <Image
          src={`https://gateway.pinata.cloud/ipfs/${image[0]}`}
          alt="product"
          width={300}
          height={500}
          className="max-w-[278px] max-h-[278px] object-cover rounded-[4px]"
        />
      )}
      </div>
      <div className="flex border-b-2 border-Foundation pb-3 flex-col mt-4 items-start w-full text-start">
        <span>{name}</span>
        <h3>{price}</h3>
        <div className="flex items-center text-center space-x-1">
          <BsDot className="text-green text-xl" />
          <span className="text-[14px] font-medium">{location}</span>
        </div>
      </div>
      <div className="flex items-center justify-center mt-6 space-x-6 w-full">
        <Link href={`/product/${name}`}>
          <button className="border-2 border-green text-[18px] font-bold px-8 py-2.5 rounded-[48px]">
            Buy
          </button>
        </Link>
        <button
          onClick={() => handleAddToCart(name)}
          className="bg-green text-[18px] font-bold px-4 py-2.5 rounded-[48px]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
