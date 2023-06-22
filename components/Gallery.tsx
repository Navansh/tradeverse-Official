import { products } from "@/constant";
import React from "react";
import ProductCard from "./ProductCard";

const Gallery = () => {
  return (
    <>
      {products.length <= 0 && (
        <div className="flex items-center justify-center text-[24px] font-bold">
          No Product Listed
        </div>
      )}

      {products.length > 0 && (
        <div className="flex flex-wrap gap-6 items-start">
          {products.map((item) => (
            <ProductCard item={item} key={item.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Gallery;
