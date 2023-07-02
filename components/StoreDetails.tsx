import { bgImage } from "@/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Gallery from "./Gallery";
import { useStoreContext } from "@/context/StoreContext";
import { useContractContext } from "@/context/ContractProvider";
import { useAccount } from "@particle-network/connect-react-ui";
import { useNotification } from "@/context/hooks/useNotification";

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

const StoreDetails = ({
  category,
  cover,
  desc,
  id,
  location,
  owner,
  profile,
  storeName,
}: Message) => {
  const [active, setActive] = useState("about");
  const account = useAccount();
  const { optInNotification, optOutNotification } = useNotification();
  const [isOptIn, setIsOptIn] = useState(false);
  const { fetchSellerProduct, sellerProduct } = useContractContext();

  useEffect(() => {
    const fetchProduct = async () => {
      const tx = await fetchSellerProduct(owner);
    };
    fetchProduct();
  }, [owner]);

  const handleOptIn = () => {
    if (!isOptIn) {
      optInNotification();
    } else {
      optOutNotification();
    }
  };
  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide">
      <div>
        <div className="flex relative flex-col justify-center w-[100%]">
          <div className="mt-[40px] flex items-center justify-center">
            <Image
              src={`${
                cover ? `https://gateway.pinata.cloud/ipfs/${cover}` : bgImage
              }`}
              width={300}
              height={500}
              className=" w-[100vw] h-[240px] object-cover rounded-[8px]"
              alt="Unsplash"
            />
          </div>
          <div className="">
            <Image
              src={`${
                profile
                  ? `https://gateway.pinata.cloud/ipfs/${profile}`
                  : bgImage
              }`}
              width={300}
              height={500}
              alt="bgimage"
              className={`absolute bottom-6 left-6 w-[200px] h-[200px] object-cover ring-4 ring-Gray/900 rounded-full flex-shrink-0 `}
            />
          </div>
          {owner === account && (
            <div className="flex items-end justify-end w-full space-x-[16px] mt-6">
              <Button title="Edit Profile" isFunc isBorder />
              <Button
                title="Create new listing"
                isLink
                link="/dashboard/newListing"
              />
            </div>
          )}
          {owner != account && (
            <div className="flex items-end justify-end w-full space-x-[16px] mt-6">
              <Button
                title="Turn on notification"
                isFunc
                handleClick={handleOptIn}
                isBorder
              />
            </div>
          )}
        </div>

        <div className="flex flex-col items-start space-y-6 pb-6 border-b border-[#E6E6E6]">
          <h1 className="text-[24px] font-bold trackking-[-1.2px]">
            {storeName}
          </h1>
          <p className="flex flex-col w-[800px] flex-shrink-0 text-[16px] leading-[24px]">
            {desc}
          </p>
        </div>

        <div className="flex items-center mt-6 space-x-9">
          <a href="#about">
            <button
              onClick={() => setActive("about")}
              className={`${
                active === "about"
                  ? "border-b-2 w-[70px] py-4 border-[#00B86B]"
                  : "border-none"
              } text-[16px] leading-[24px] text-center font-semibold`}
            >
              About
            </button>
          </a>
          <a href="#gallery">
            <button
              onClick={() => setActive("gallery")}
              className={`${
                active === "gallery"
                  ? "border-b-2 py-4 border-[#00B86B]"
                  : "border-none"
              } text-[16px] leading-[24px] text-center font-semibold`}
            >
              Gallery
            </button>
          </a>
        </div>

        <div className="mt-6">
          {active === "gallery" && <Gallery userProduct={sellerProduct} />}
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
