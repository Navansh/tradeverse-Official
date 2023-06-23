import React from "react";
import Button from "./Button";
import Image from "next/image";
import { logo } from "@/assets";

const Footer = () => {
  return (
    <footer className="w-full h-[376px]">
      <div className="w-full flex items-center justify-between p-[80px] h-[376px]">
        <div className="flex flex-col items-start space-y-[16px] max-w-[500px]">
          <Image
            src={logo}
            alt="logo"
            className="w-[40px] h-[40px] object-contain"
          />
          <h1 className="text-[24px] font-semibold">
            Discover, Connect, and Thrive in the World of Decentralized
            Commerce.
          </h1>
          <p className="text-[16px] font-normal">TradeVerse, 2023.</p>
        </div>
        <Button title="Join now" isLink />
      </div>
      <div className="flex items-center justify-between border-t-2 border-[#E6E6E6] w-full px-[88px] py-[16px]">
        <span>© 2023 Tradeverse Inc.</span>
        <div className="flex items-center space-x-[40px]">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
