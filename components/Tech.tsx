import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";
import { blockpi, dataverse, huddle, particle, polygon } from "@/assets";

const Tech = () => {
  return (
    <div className="py-[40px] w-full bg- my-9 bg-Gray/900  space-y-[16px] h-[247px] flex flex-col scrollbar-hide items-start">
      <div className=" fixed z-[6666]" />
      <h1 className="text-[40px] font-bold ml-[40px]">Technologies Used</h1>

      <Marquee speed={80} className="mt-[40px] scrollbar-hide overflow-hidden">
        <div className="flex space-x-[40px] overflow-hidden scrollbar-hide">
          <Image
            src={polygon}
            alt="Image 1"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={dataverse}
            alt="Image 2"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={blockpi}
            alt="Image 3"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={particle}
            alt="Image 3"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={huddle}
            alt="Image 3"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={polygon}
            alt="Image 1"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={dataverse}
            alt="Image 2"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={blockpi}
            alt="Image 3"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={particle}
            alt="Image 3"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={huddle}
            alt="Image 3"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={blockpi}
            alt="Image 3"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={particle}
            alt="Image 3"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
          <Image
            src={huddle}
            alt="Image 3"
            className="w-[80px] h-[80px] rounded-full object-contain"
          />
        </div>
      </Marquee>
    </div>
  );
};

export default Tech;
