import Image from "next/image";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import DetailCard from "./DetailCard";
import { FaArrowLeft } from "react-icons/fa";
import { products } from "@/constant";
import ProductCard from "./ProductCard";
import { useRouter } from "next/router";
import { useContractContext } from "@/context/ContractProvider";
import { useStoreContext } from "@/context/StoreContext";

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
  active: boolean,
  id: string
}

type Props = {
  item: Product;
};

const ProductDetails = ({ item }: Props) => {
  console.log(item);
  const router = useRouter();
  const { allProduct, productByAddress } = useContractContext();
  console.log(item);

  useEffect(() => {
    const product = productByAddress(item.owner);
    console.log(product)
  }, [item.owner]);

  if (!item || !item.image || item.image.length === 0) {
    // Handle missing or empty data
    return <div>No product details available.</div>;
  }

  return (
    <div className="overflow-y-scroll scrollbar-hide min-w-screen">
      <div className="flex-1 m-9">
        <div
          onClick={() => router.back()}
          className="bg-white/50 cursor-pointer text-white h-9 w-9 rounded-full p-3"
        >
          <FaArrowLeft size={15} />
        </div>
        <div className="flex flex-col items-start">
          <div className="grid grid-cols-2 items-center gap-12 my-16 pb-12">
            <div className="max-w-[643px]">
              <Carousel indicators={item?.image}>
                {item?.image?.map((s: string[], i: number) => (
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${s}`}
                    width={643}
                    height={643}
                    alt={`product-${i}`}
                    key={i}
                    className="min-w-[643px] max-h-[643px] object-cover"
                  />
                ))}
              </Carousel>
            </div>
            <DetailCard item={item} />
          </div>
          <div className="flex flex-col my-16 h-screen items-start">
            <h2 className="text-[24px] leading-[24px] font-bold">
              More Products from this seller
            </h2>
            <div className="flex flex-wrap gap-12 items-start">
              {allProduct?.slice(0, 3).map((relatedProduct: Product, i) => (
                <ProductCard {...relatedProduct} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
