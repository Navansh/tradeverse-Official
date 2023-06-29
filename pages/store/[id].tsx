import { Navbar, Sidebar } from "@/components";
import StoreDetails from "@/components/StoreDetails";
import { useStoreContext } from "@/context/StoreContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Message {
  id: string;
  profile: string;
  desc: string;
  location: string;
  cover: string;
  category: string;
  storeName: string;
  owner: string;
}

const Store = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { allStore } = useStoreContext();
  const [seller, setSeller] = useState<Message[] | undefined>([]);

  useEffect(() => {
    const getProduct = () => {
      const selectedProduct = allStore?.find(
        (item: Message) => item.storeName === id
      );
      console.log(selectedProduct);
      setSeller(selectedProduct ? [selectedProduct] : undefined);
    };

    if (id) {
      getProduct();
    }
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <div className="mx-[20px]">
          {seller?.map((item, i) => (
            <StoreDetails key={i} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Store;
