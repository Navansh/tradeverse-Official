import { bgImage } from "@/assets";
import Image from "next/image";
import React, { useState } from "react";
import Button from "./Button";
import Gallery from "./Gallery";

const MyProfile = () => {
  const [active, setActive] = useState("about");
  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide">
      <div >
        <div className="flex relative flex-col justify-center w-[100%]">
          <div className="mt-[40px] flex items-center justify-center">
            <Image
              src={bgImage}
              className=" w-[100vw] h-[240px] object-cover rounded-[8px]"
              alt="Unsplash"
            />
          </div>
          <div className="">
            <Image
              src={bgImage}
              alt="bgimage"
              className="absolute bottom-6 border-4 border-[#1C2631] left-6 w-[200px] h-[200px] rounded-full flex-shrink-0"
            />
          </div>
          <div className="flex items-end justify-end w-full space-x-[16px] mt-6">
            <Button title="Edit Profile" isLink isBorder  />
            <Button title="Create new listing" isLink link="/dashboard/newListing" />
          </div>
        </div>

        <div className="flex flex-col items-start space-y-6 pb-6 border-b border-[#E6E6E6]">
          <h1 className="text-[24px] font-bold trackking-[-1.2px]">
            Pod Store
          </h1>
          <p className="flex flex-col w-[800px] flex-shrink-0 text-[16px] leading-[24px]">
            Welcome to our Pod Store! Discover a world of innovative and
            cutting-edge products designed to enhance your lifestyle.Explore our
            Pod Store today and find the perfect companion for your everyday
            adventures
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

        <div className="mt-6">{active === "gallery" && <Gallery />}</div>
      </div>
    </div>
  );
};

export default MyProfile;
