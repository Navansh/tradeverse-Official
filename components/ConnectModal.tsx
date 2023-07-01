import { profile } from "@/assets";
import { ConnectButton } from "@particle-network/connect-react-ui";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "@particle-network/connect-react-ui/dist/index.css";
import { useStoreContext } from "@/context/StoreContext";
import AccountModal from "./AccountModal";

const ConnectModal = () => {
  const { userStore } = useStoreContext();
  const [active, setActive] = useState(false);
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
          <div className="relative">
            {!account && (
              <button
                onClick={openConnectModal}
                className="border-2 border-green px-5 py-2.5 rounded-full flex space-x-2 items-center"
              >
                <Image
                  src={profile}
                  alt="product"
                  className="w-[24px] h-[24px] rounded-full object-cover"
                />
                <span className="text-green">Connect Wallet</span>
                <FaChevronDown size={25} className="text-green" />
              </button>
            )}

            {account && (
              <button className="border-2 border-green px-5 py-2.5 rounded-full flex space-x-6 items-center">
                <div onClick={() => setActive(!active)}>
                  <Image
                    src={profile}
                    alt="product"
                    className="w-[24px] rounded-full h-[24px] object-cover"
                  />
                </div>
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
            {active &&(
              <div className="fixed z-[99999] right-[80px] top-[60px]">
                 <AccountModal chain={chain} account={account} />
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectModal;
