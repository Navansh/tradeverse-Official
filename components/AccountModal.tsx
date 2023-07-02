import { getBalance } from "@/constant/BlockPiApi";
import { ChainInfo } from "@particle-network/common";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { BsFillPersonFill } from "react-icons/bs";
import { eye, setting } from "@/assets";
import { FaChevronRight, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useDataverse } from "@/context/hooks/useDataverse";
import { WALLET } from "@dataverse/runtime-connector";

interface Props {
  chain: ChainInfo | undefined;
  account: string | undefined;
}

const AccountModal = ({ chain, account }: Props) => {
  const [balance, setBalance] = useState("");
  const { createCapability, checkCapability } = useDataverse();

  useEffect(() => {
    const fetchBalance = async () => {
      await fetch(
        "https://polygon-mumbai.blockpi.network/v1/rpc/1765140f9abdd58481722479f70afdf328209c55",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [account, "latest"],
            id: 1,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.result);
          setBalance((Number(data.result) / 10 ** 18).toFixed(2));
          // Handle the response data here
        })
        .catch((error) => {
          console.error(error);
          // Handle any errors here
        });
    };
    fetchBalance();
  }, [account]);

  async function initiateCapability() {
    const res = await checkCapability();
    if (res === false) {
      await createCapability(WALLET.METAMASK);
    }
  }

  const totalBalance = parseFloat(balance) * 0.7;
  return (
    <div className="bg-Gray/900 w-[400px] h-[419px] p-[40px]">
      <div className="flex items-center space-x-[60px]">
        <Button
          title="Create Capability"
          isFunc
          handleClick={initiateCapability}
        />
        <Image
          src={setting}
          alt="setting"
          className="w-[24px] h-[24px] object-contain"
        />
      </div>
      <div className="mt-[46px] flex flex-col items-center space-y-[8px]">
        <div className="flex items-center space-x-2">
          <span className="text-green text-[14px] font-normal">
            Your balance
          </span>
          <Image
            src={eye}
            alt="eye"
            className="w-[24px] h-[24px] object-contain"
          />
        </div>
        <h1 className=" text-[40px] font-bold leading-normal tracking-[2px]">
          ${totalBalance.toFixed(2)}
        </h1>
        <span className="text-[14px] font-normal text-Foundation">
          {balance} MATIC
        </span>
        <div className="flex text-Foundation items-center space-x-[40px]">
          <div className="flex flex-col items-center">
            <div className="bg-white/40 text-[#fff] w-[40px] h-[40px] text-center flex items-center justify-center rounded-full">
              <FaPlus size={24} />
            </div>
            <span className="text-[14px] font-bold">Buy</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white/40 text-[#fff] w-[40px] h-[40px] text-center flex items-center justify-center rounded-full">
              <FaPlus size={24} />
            </div>
            <span className="text-[14px] font-bold">Receive</span>
          </div>
          <Link href="/profile" className="flex flex-col items-center">
            <div className="bg-white/40 text-[#fff] w-[40px] h-[40px] text-center flex items-center justify-center rounded-full">
              <BsFillPersonFill size={24} />
            </div>
            <span className="text-[14px] font-bold">Profle</span>
          </Link>
        </div>
      </div>

      <div className="w-[340px] bg-[#1C2631] h-1 flex items-center px-[16px] mt-[40px]" />
      <div className="flex items-center mt-[18px] text-Foundation">
        <span className="text-[14px] font-normal ">Transaction history</span>
        <FaChevronRight size={14} />
      </div>
    </div>
  );
};

export default AccountModal;
