import { products } from "@/constant";
import React from "react";
import ProductCard from "./ProductCard";
import { useContractContext } from "@/context/ContractProvider";

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

interface Prop {
  userProduct: Product[];
}

const Gallery = ({ userProduct }: any) => {
  return (
    <>
      <div className="flex flex-wrap gap-6 pb-[96px] items-start">
        {userProduct.map((item: Product, i: any) => (
          <ProductCard {...item} key={i} />
        ))}
      </div>
    </>
  );
};

export default Gallery;
