import { blockpi, dataverse, huddle, particle, polygon } from "@/assets";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const marquee = () => {
  return (
    <div className="py-[40px] w-full h-[247px]">
      <h1>Technologies Used</h1>
      <Marquee>
        <div className="flex space-x-[40px]">
          <Image
            src={polygon} // Replace with your image source
            alt="Image 1"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={dataverse} // Replace with your image source
            alt="Image 2"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={blockpi} // Replace with your image source
            alt="Image 3"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={particle} // Replace with your image source
            alt="Image 3"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={huddle} // Replace with your image source
            alt="Image 3"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          {/* Add more images here */}
        </div>
      </Marquee>
    </div>
  );
};

export default marquee;
