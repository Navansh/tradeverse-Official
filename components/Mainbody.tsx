"use client";
import { product, profile } from "@/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import { products } from "@/constant";
import { useContractContext } from "@/context/ContractProvider";
import { Love_Light } from "next/font/google";
import { useStoreContext } from "@/context/StoreContext";
import { db } from "../firebase";
import { useAccount } from "@particle-network/connect-react-ui";
import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
} from "firebase/firestore";

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
  id: string;
}


interface Message {
  id: string;
  profile: string;
  desc: string;
  location: string;
  cover: string;
  category: string;
  storeName: string
}

const Mainbody = () => {
  const { allProduct } = useContractContext();
  const { allStream, allStore } = useStoreContext();
  return (
    <div className="flex-1 h-screen w-screen pb-[30px] mx-9 flex flex-col items-start mt-9">
      <div className="flex overflow-hidden border-b-2 border-Foundation w-full py-12 items-center">
        {allStream.map((item: any, i: any) => (
          <div key={i}>
            {item.isActive && (
              <button
                onClick={() =>
                  window.open(
                    `https://iframe.huddle01.com/${item.streamId}`,
                    "blank"
                  )
                }
                className="border border-green px-5 py-2.5 rounded-[48px] flex items-center space-x-3"
              >
                <Image src={profile} alt="profile" />
                <span className="text-[14px] font-bold text-[#fff]">
                  {item.storeName}{" "}
                  <span className="font-normal">is hosting a live Video</span>
                </span>
                <FaMicrophoneAlt size={25} className="text-Foundation" />
              </button>
            )}
          </div>
        ))}
      </div>

      {allProduct.length === 0 && (
        <div className="text-center text-[24px] font-bold ">
          No Listing available
        </div>
      )}

      {/** product */}
      <div className="border-b-2 border-Foundation w-full flex !flex-wrap items-start justify-start gap-12 pb-24 w-ful">
        {allProduct.map((item: Product, i: any) => (
          <ProductCard key={i} {...item} />
        ))}
      </div>

      <div className="flex-col items-start pt-6">
        <h1 className="text-[24px] font-bold">Browse Stores</h1>
        <div className="border-b-2 border-Foundation w-screen flex !flex-wrap items-start justify-start gap-12 pb-24 w-ful">
          {allStore?.map((item: Message, i) => (
            <CategoryCard key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mainbody;
