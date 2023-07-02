import { logo, profile } from "@/assets";
import Image from "next/image";

import ConnectModal from "./ConnectModal";
import Link from "next/link";

const MainNav = () => {
  return (
    <div className="flex items-center justify-between border-b-4 border-[#fff] w-full bg-Bar px-9 py-2.5">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            className="w-[48px] h-[48px] object-contain"
          />
        </Link>

        <span>TradeVerse</span>
      </div>
      <ConnectModal />
    </div>
  );
};

export default MainNav;
