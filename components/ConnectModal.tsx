import { profile } from "@/assets";
import { ConnectButton } from "@particle-network/connect-react-ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChevronDown } from "react-icons/fa";
import "@particle-network/connect-react-ui/dist/index.css";
import { useStoreContext } from "@/context/StoreContext";

const ConnectModal = () => {
  const { userStore } = useStoreContext();

  const profileImage = userStore?.map((item) => {
    return item?.profile;
  });

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
                {profileImage && profileImage[0] && (
                  <Image
                    src={`https://gateway.pinata.cloud/ipfs/${profileImage[0]}`}
                    alt="product"
                    width={300}
                    height={500}
                    className="w-[24px] h-[24px] rounded-full object-cover"
                  />
                )}
                <span className="text-green">Connect Wallet</span>
                <FaChevronDown size={25} className="text-green" />
              </button>
            )}

            {account && (
              <button className="border-2 border-green px-5 py-2.5 rounded-full flex space-x-6 items-center">
                <Link href="/profile">
                  {profileImage && profileImage[0] && (
                    <Image
                      src={`https://gateway.pinata.cloud/ipfs/${profileImage[0]}`}
                      alt="product"
                      width={300}
                      height={500}
                      className="w-[24px] rounded-full h-[24px] object-cover"
                    />
                  )}
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