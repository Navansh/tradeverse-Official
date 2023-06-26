"use client";
// Update the import to the correct path
import Button from "@/components/Button"; // Update the import to the correct path
import Image from "next/image";
import { logo } from "@/assets";
import { useTradeContext } from "@/context";
import { useRouter } from "next/router";
import {
  ParticleConnect,
  metaMask,
  web3Modal,
} from "@particle-network/connect";
import {
  Ethereum,
  EthereumGoerli,
  BSCTestnet,
  PolygonMumbai,
} from "@particle-network/common";
import React, { useEffect, useMemo, useState } from "react";
import {
  ConnectButton,
  useAccount,
  useAccountInfo,
} from "@particle-network/connect-react-ui";
import "@particle-network/connect-react-ui/dist/index.css";
import ConnectModal from "@/components/ConnectModal";

const Connect = () => {
  const router = useRouter();
  const account = useAccount();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-w-[800px] min-h-[440px]  bg-[#253343] flex flex-col items-center justify-center px-[130px] py-[54.33px] rounded-[40px] space-y-[16px]">
        <Image
          src={logo}
          alt="logo"
          className="w-[80px] h-[61px] object-contain"
        />
        <h2 className="text-[4vw] md:text-[30px] text-center w-full leading-[6vh] font-semibold">
          {account
            ? "Congratulations, you're in!"
            : "Connect wallet to TradeVerse"}
        </h2>
        <p className="text-[2vw] md:text-[16px] leading-[3vh] text-center font-semibold">
          {account
            ? "Congratulations! Your wallet is now connected. Enjoy secure transactions on TradeVerse"
            : "Connect Your Wallet for Seamless Transactions and Enhanced Security"}
        </p>
        {!account && <ConnectModal />}
        {account && (
          <Button title="Explore marketplace" isLink link="/dashboard/feed" />
        )}
      </div>
    </div>
  );
};

export default Connect;
