import { Navbar, ProductCard, ProductDetails, Sidebar } from "@/components";
import { products } from "@/constant";
import { useContractContext } from "@/context/ContractProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const { allProduct, productByAddress } = useContractContext();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  console.log(product)

  useEffect(() => {
    const getProduct = () => {
      const selectedProduct = allProduct.find((item: any) => item.name === id);
      console.log(selectedProduct)
      setProduct(selectedProduct);
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="flex h-screen overflow-hidden w-screen">
        <Sidebar />
        {product ? (
          <ProductDetails item={product} />
        ) : (
          <div>Loading...</div> // Render a loading state or handle the case when product is undefined
        )}
      </div>
    </>
  );
};

export default Details;