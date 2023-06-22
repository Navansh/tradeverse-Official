import { videoImage } from "@/assets";
import Image from "next/image";
import React from "react";
import Button from "./Button";

const Feature = () => {
  return (
    <>
      <Image
        src={videoImage}
        alt="videocall"
        className="min-w-[3280p] h-[760px] lg:ml-[80px] object-cover justify-center"
      />
      <div className="flex flex-col items-start text-start space-y-[16px] mt-[80px] lg:ml-[80px] ">
        <h1 className="text-[24px] leading-[28.13px] font-bold inline-bloc max-w-[517px] h-[28px]">Revolutionary Connection, Convenience, and Security</h1>
        <p className="pt-[24px] w-[880px] inline-block h-[96px] text-[16px] leading-[24px] font-normal tracking-widest">
          At TradeVerse, we`re revolutionizing e-commerce by fostering
          meaningful connections between buyers and sellers. Our live sessions
          enable real-time interactions, creating authentic experiences and
          building trust. Shop with confidence, knowing your transactions are
          secure and your data is protected. Enjoy a user-friendly interface and
          a seamless journey from discovery to purchase.
        </p>
        <p className="pt-[24px] w-[880px] inline-block h-[96px] text-[16px] leading-[24px] font-normal tracking-widest">
          Join TradeVerse today and experience the future of e-commerce, where
          direct interactions, curated galleries, convenience, and security
          redefine your online shopping.
        </p>
        <Button title="Join now" isLink  />
      </div>
    </>
  );
};

export default Feature;
