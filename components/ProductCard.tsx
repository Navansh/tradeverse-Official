import { celo, product } from "@/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaChevronRight } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import { useTradeContext } from "@/context";
import axios from "axios";
import { convertToEthereum } from "@/constant/convertionUtils";

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
  active: boolean;
  id: string
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
  active,
  id
}: Product) => {
  const { handleAddToCart } = useTradeContext();
  //console.log(image[0])
  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }

    return text.slice(0, maxLength) + "...";
  }

  const [ethereumPrice, setEthereumPrice] = useState<string>("");

  useEffect(() => {
    async function getEthereumPrice() {
      try {
        const ethereumAmount = await convertToEthereum(
          price,
          "ethereum",
          "usd"
        );
        setEthereumPrice(ethereumAmount);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    getEthereumPrice();
  }, [price]);
  return (
    <div className="border-2 relative cursor-pointer border-Gray/900 mt-9 px-3 py-2.5 w-[310px] flex-shrink-0 h-[491px]">
      <div className="">
        {image?.length > 0 && (
          <Image
            src={`https://gateway.pinata.cloud/ipfs/${image[0]}`}
            alt="product"
            width={300}
            height={500}
            className="max-w-[278px] max-h-[278px] object-cover p-4 bg-no-repeat rounded-[4px]"
          />
        )}
        <div className="absolute top-0 right-0  ">
          {active === true && (
            <Link href={`/meet/${id}`} className="bg-[#F90000] p-[14px] flex items-center justify-end space-x-2">
              <span>Seller is Live</span>
              <FaArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start px-[16px]">
        <span className="truncate text-[18px] pt-[16px]">
          {truncateText(name, 25)}
        </span>
        <h3 className="text-[24px] flex items-center font-bold pt-[8px]">
          ${price} -{" "}
          <span className="flex ietms-center">
            {ethereumPrice}
            <Image src={celo} alt="celo" className="w-6 h-6 object-contain" />
          </span>
        </h3>
        <div className="flex items-center text-center">
          <BsDot className="text-green text-xl" />
          <span className="text-[14px] font-medium pb-[8px]">{location}</span>
        </div>
      </div>
      <div className="flex items-center border-t-2 py-[16px] border-[#E6E6E6] justify-center space-x-6 w-full">
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
