import { bgImage } from "@/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Gallery from "./Gallery";
import { useContractContext } from "@/context/ContractProvider";
import { useStoreContext } from "@/context/StoreContext";
import { useAccount } from "@particle-network/connect-react-ui";

interface Props {
  storeName: string;
  category: string;
  name: string;
  lastName: string;
  description: string;
  location: string;
}

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

const MyProfile = () => {
  const [active, setActive] = useState("about");
  const { stream, userStore, allStore, setUserStore } = useStoreContext();
  console.log(stream);
  const account = useAccount();
  const { userProduct } = useContractContext();

  useEffect(() => {
    const filterForUserStore = async () => {
      try {
        const userStore = allStore?.filter(
          (item: Message | undefined) => item?.owner === account
        );
        console.log(userStore);
        setUserStore(userStore);
      } catch (error) {
        console.log(error);
      }
    };

    filterForUserStore()
  });
  //console.log(streamData)

  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide">
      {userStore?.map((item, i) => (
        <div key={i}>
          <div className="flex relative flex-col justify-center w-[100%]">
            <div className="mt-[40px] flex items-center justify-center">
              <Image
                src={`${
                  item.cover
                    ? `https://gateway.pinata.cloud/ipfs/${item.cover}`
                    : bgImage
                }`}
                width={300}
                height={500}
                className=" w-[100vw] h-[240px] object-cover rounded-[8px]"
                alt="Unsplash"
              />
            </div>
            <Image
              src={`${
                item.profile
                  ? `https://gateway.pinata.cloud/ipfs/${item.profile}`
                  : bgImage
              }`}
              width={300}
              height={500}
              alt="bgimage"
              className={`absolute bottom-6 left-6 w-[200px] h-[200px] object-cover ring-4 ring-Gray/900 rounded-full flex-shrink-0 `}
            />
            <div className="flex items-end justify-end w-full space-x-[16px] mt-6">
              <Button title="Edit Profile" isLink isBorder />
              <Button
                title="Create new listing"
                isLink
                link="/dashboard/newListing"
              />
            </div>
          </div>

          <div className="flex flex-col items-start space-y-6 pb-6 border-b border-[#E6E6E6]">
            <h1 className="text-[24px] font-bold trackking-[-1.2px]">
              {item.storeName}
            </h1>
            <p className="flex flex-col w-[800px] flex-shrink-0 text-[16px] leading-[24px]">
              {item.desc}
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
            {active === "gallery" && <Gallery userProduct={userProduct} />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProfile;
