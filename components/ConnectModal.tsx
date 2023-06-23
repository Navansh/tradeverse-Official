import { profile } from "@/assets";
import { ConnectButton } from "@particle-network/connect-react-ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import "@particle-network/connect-react-ui/dist/index.css";

const ConnectModal = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        openChainModal,
        accountLoading,
      }) => {
        return (
          <div>
            {!account && (
              <button
                onClick={openConnectModal}
                className="border-2 border-green px-5 py-2.5 rounded-full flex space-x-2 items-center"
              >
                <Image
                  src={profile}
                  alt="profile"
                  className="w-[24px] h-[24px] object-cover"
                />
                <span className="text-green">Connect Wallet</span>
                <FaChevronDown size={25} className="text-green" />
              </button>
            )}

            {account && (
              <button className="border-2 border-green px-5 py-2.5 rounded-full flex space-x-6 items-center">
                <Link href="/profile">
                  <Image
                    src={profile}
                    alt="profile"
                    className="w-[24px] h-[24px] object-cover"
                  />
                </Link>
                <span onClick={openAccountModal} className="text-green">
                  {account?.slice(0, 9)}
                </span>
                <Image
                  onClick={openChainModal}
                  src={`${chain?.icon}`}
                  alt={`${chain?.name}`}
                  width={30}
                  height={30}
                />
              </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectModal;
