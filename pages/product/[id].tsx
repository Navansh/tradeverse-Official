import { Navbar, ProductCard, ProductDetails, Sidebar } from "@/components";
import { products } from "@/constant";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {
  image: any;
  title: string;
  price: string;
  location: string;
  isSellerActive: boolean;
};

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Props | undefined>(undefined);
  console.log(product);

  useEffect(() => {
    const getProduct = () => {
      const selectedProduct = products.find((item) => item.title === id);
      //console.log(selectedProduct);
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
          <ProductDetails item={product} />
      </div>
    </>
  );
};

export default Details;
