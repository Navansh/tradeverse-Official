import { how } from "@/assets";
import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  return (
    <div className="lg:pl-[80px] flex flex-col items-start">
      <h1 className="text-[40px] leading-[48.88px] font-bold">How It Works</h1>
      <p className="text-[16px] leading-[24px] font-normal w-[800px] inline-block h-[48px]">
        Welcome to TradeVerse, the decentralized marketplace that revolutionizes
        the way buyers and sellers connect. Our platform offers a range of
        unique selling points and benefits that set us apart.
      </p>
      <Image src={how} alt="howitworks" className="w-[1280px] h-[32p mt-[40px] object-cover" />
    </div>
  );
};

export default HowItWorks;
