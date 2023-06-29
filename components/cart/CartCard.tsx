import { useTradeContext } from "@/context";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsDot } from "react-icons/bs";

interface Props {
  category: string;
  desc: string;
  image: string[];
  location: string;
  max: number;
  name: string;
  owner: string;
  pid: number;
  price: number;
  quantity: null;
}

const CartCard = ({
  category,
  desc,
  image,
  location,
  max,
  name,
  owner,
  pid,
  price,
}: Props) => {
    const quantity = 0
    const {handleUpdateQuantity, handleRemoveFromCart } = useTradeContext()
  return (
    <div className="min-w-[551px] min-h-[171px] relative border-2 border-Gray/900 rounded-[8px] px-[16px] py-[16px]">
        <div onClick={() => handleRemoveFromCart(1)} className="absolute cursor-pointer bg-white/40 p-3 rounded-full top-4 right-4">
            <AiOutlineClose />
        </div>
      <div className="flex items-start justify-around space-x-[9px]">
        {image?.length > 0 && (
          <Image
            src={`https://gateway.pinata.cloud/ipfs/${image[0]}`}
            alt="product"
            width={139}
            height={139}
            className="object-cover rounded-[4px]"
          />
        )}
        <div className="flex flex-col items-start mt-[15%]  space-y-[">
          <h1 className="text-[18px] font-normal">{name}</h1>
          <h1 className="text-[24px] font-bold">${price}</h1>
          <div className="flex items-center text-center">
            <BsDot className="text-green text-2xl" />
            <span className="text-[14px] font-medium pb-[8px]">{location}</span>
          </div>
        </div>

        <div className="border-4 text-[16px] font-bold border-Bar rounded-[8px] w-[123px] mt-[15%] flex items-start h-[48px]">
              <span
               onClick={() => handleUpdateQuantity(quantity, -1)}
                className="border-r-4 px-4 py-2.5 border-Bar text-Foundation"
              >
                -
              </span>
              <span className="text-[#fff] px-4 py-2.5">{quantity}</span>
              <span
               onClick={() => handleUpdateQuantity(quantity, 1)}
                className="border-l-4 border-Bar text-Foundation px-4 py-2.5"
              >
                +
              </span>
            </div>
      </div>
    </div>
  );
};

export default CartCard;
