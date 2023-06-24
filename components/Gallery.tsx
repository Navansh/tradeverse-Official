import { products } from "@/constant";
import React from "react";
import ProductCard from "./ProductCard";
import { useContractContext } from "@/context/ContractProvider";

interface Product {
  name: string
  desc: string
  image: never[]
  price: number
  category: string
  pid: number
  quantity: number
  location: string
  max: number
  owner: string
  refund: number,
  active: boolean
}

const Gallery = () => {
  const { userProduct } = useContractContext()
  console.log(userProduct)
  return (
    <>
      {userProduct.length <= 0 && (
        <div className="flex items-center justify-center text-[24px] font-bold">
          No Product Listed
        </div>
      )}

      {userProduct.length > 0 && (
        <div className="flex flex-wrap gap-6 pb-[96px] items-start">
          {userProduct.map((item: Product, i: any) => (
            <ProductCard {...item} key={i} />
          ))}
        </div>
      )}
    </>
  );
};

export default Gallery;
