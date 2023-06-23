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
  const { address, setAddress } = useTradeContext();
  console.log(address);
  const router = useRouter();

  // const createCapability = async () => {
  //   if (typeof window != "undefined") {
  //     const runtimeConnector = new RuntimeConnector(Extension);
  //     const pkh = await runtimeConnector?.createCapability({
  //       app: "PolyverseTest",
  //       wallet: WALLET.METAMASK, // optional, if not connected
  //     });
  //     console.log(pkh);
  //     return pkh;
  //   }
  // };

  // const connect = async () => {
  //   try {
  //     if (typeof window != "undefined") {
  //       const runtimeConnector = new RuntimeConnector(Extension);
  //       const wallet = await runtimeConnector?.connectWallet(WALLET.METAMASK);
  //       await runtimeConnector?.switchNetwork(44787);
  //       createCapability();
  //       console.log(wallet.address);
  //       setAddress(wallet?.address);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const [provider, setProvider] = useState<any>();

  const connectKit = useMemo(() => {
    return new ParticleConnect({
      projectId: "a581fe1b-809a-40f9-a9e5-6ac8683695fc",
      clientKey: "ccyYA3EfVgH6LjvwxCbdi4E3qdkzjRmZR3t4c0Ot",
      appId: "c859c0a7-fedf-48d1-844f-5813a3c228ca",
      chains: [Ethereum, EthereumGoerli, BSCTestnet],
      wallets: [metaMask(), web3Modal()],
    });
  }, []);

  const account = useAccount();
  console.log(account);

  // useEffect(() => {
  //   if (provider) {
  //     window.location.reload()
  //     router.push("welcome");
  //   }
  // }, [provider, router])

  const connectWallet = async (id: string, options?: any) => {
    try {
      const connectProvider = await connectKit?.connect(id, options);
      connectKit?.switchChain(PolygonMumbai);
      setProvider(connectProvider);
    } catch (error) {
      console.error("connectWallet", error);
    }
  };

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
