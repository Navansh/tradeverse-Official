import { logo } from "@/assets";
import Image from "next/image";
import React from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import ConnectModal from "./ConnectModal";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b-4 border-[#fff] bg-Bar flex w-full items-center justify-between py-2.5 px-5">
      <div className="flex items-center space-x-4">
      <Link href="/dashboard/feed">
          <Image
            src={logo}
            alt="logo"
            className="w-[48px] h-[48px] object-contain"
          />
        </Link>
        <span className="md:text-[24px] text-[20px] font-bold">TradeVerse</span>
        <div className="hidden lg:flex items-center inputbg w-[480px] px-4 py-2.5 rounded-[48px] space-x-3">
          <FaSearch />
          <input
            type="text"
            placeholder="Search Marketplace"
            className="w-full border-none outline-none bg-transparent text-Foundation placeholder:text-[#A3A3A3]"
          />
        </div>
      </div>

      <ConnectModal />

      <FaBars size={25} className="md:hidden block" />
    </nav>
  );
};

export default Navbar;
