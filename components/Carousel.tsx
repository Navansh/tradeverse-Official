"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({ children, indicators }: any) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? children.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === children.length - 1 ? 0 : curr + 1));
  return (
   
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button onClick={prev} className="bg-black/30 p-1 rounded-full">
          <FaChevronLeft size={25} />
        </button>
        <button onClick={next} className="bg-black/30 p-1 rounded-full">
          <FaChevronRight size={25} />
        </button>
      </div>
      <div className=" mt-8">
        <div className="flex items-center gap-2 justify-center">
          {children?.map((_: any, index: any) => (
            <div onClick={() => setCurr(index)} key={index}>
              {index === curr ? (
                <Image src={indicators[index]} alt="image indicator"className="h-[80px] w-[80px] bg-gray-300"  />
              ) : (
                <Image
                  src={indicators[index]}
                  alt="image indicator"
                  className="h-[80px] w-[80px] bg-gray-300 opacity-40"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
