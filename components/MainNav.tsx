import { logo, profile } from "@/assets";
import { useTradeContext } from "@/context";
import {
  Extension,
  RuntimeConnector,
  WALLET,
} from "@dataverse/runtime-connector";
import Image from "next/image";

import ConnectModal from "./ConnectModal";

const MainNav = () => {
  const { address, setAddress } = useTradeContext();

  

  return (
    <div className="flex items-center justify-between border-b-4 border-[#fff] w-full bg-Bar px-9 py-2.5">
      <div className="flex items-center space-x-2">
        <Image
          src={logo}
          alt="logo"
          className="w-[48px] h-[48px] object-contain"
        />
        <span>TradeVerse</span>
      </div>
      <ConnectModal />
    </div>
  );
};

export default MainNav;
