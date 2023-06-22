import Image from "next/image";
import React, { useState } from "react";
import Carousel from "./Carousel";
import DetailCard from "./DetailCard";
import { FaArrowLeft } from "react-icons/fa";
import { products } from "@/constant";
import ProductCard from "./ProductCard";
import { useRouter } from "next/router";

type Props = {
  image: any;
  title: string;
  price: string;
  location: string;
  isSellerActive: boolean;
  description: string;
  id: number;
  quantity: number;
};

interface Type {
  item: Props;
}

const ProductDetails = ({ item }: any) => {
  const images = item?.image;
  const router = useRouter()

  return (
    <div className="overflow-y-scroll scrollbar-hide min-w-screen">
    <div className="flex-1  m-9 ">
      <div onClick={() => router.back()} className="bg-white/50 cursor-pointer text-white h-9 w-9 rounded-full p-3">
        <FaArrowLeft size={15} />
      </div>
      <div className="flex flex-col items-start">
        <div className="flex flex-wrap gap-12 my-16 pb-12">
          <div className="max-w-[643px]">
            <Carousel indicators={images}>
              {images?.map((s: any) => (
                <Image
                  src={s}
                  alt={`${s.title}`}
                  key={s}
                  className="min-w-[643px] max-h-[643px] object-cover"
                />
              ))}
            </Carousel>
          </div>
          <DetailCard item={item} />
        </div>
        <div className=" flex flex-col my-16 h-screen items-start">
          <h2 className="text-[24px] leading-[24px] font-bold">More Products from this seller</h2>
          <div className="flex flex-wrap gap-12 items-start">
            {products?.slice(0, 3).map((item, i) => (
              <ProductCard item={item} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
