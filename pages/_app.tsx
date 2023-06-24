import { TradeVerseProvider } from "@/context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useHuddle01 } from "@huddle01/react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ModalProvider } from "@particle-network/connect-react-ui";
import { WalletEntryPosition } from "@particle-network/auth";
import { Ethereum, EthereumGoerli, Celo, CeloTestnet } from "@particle-network/common";
import { evmWallets } from "@particle-network/connect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContractProvider } from "@/context/ContractProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider
      options={{
        projectId: "a581fe1b-809a-40f9-a9e5-6ac8683695fc",
        clientKey: "ccyYA3EfVgH6LjvwxCbdi4E3qdkzjRmZR3t4c0Ot",
        appId: "9fcfcc9f-a1c7-41eb-afaa-939befdd3b33",
        chains: [Celo, CeloTestnet],
        particleWalletEntry: {
          //optional: particle wallet config
          displayWalletEntry: true, //display wallet button when connect particle success.
          defaultWalletEntryPosition: WalletEntryPosition.BR,
          supportChains: [Celo, CeloTestnet],
          customStyle: {}, //optional: custom wallet style
        },
        securityAccount: {
          //optional: particle security account config
          //prompt set payment password. 0: None, 1: Once(default), 2: Always
          promptSettingWhenSign: 1,
          //prompt set master password. 0: None(default), 1: Once, 2: Always
          promptMasterPasswordSettingWhenLogin: 1,
        },
       // wallets: evmWallets({ qrcode: false }),
      }}
      theme={"light"}
      language={"en"} //optional：localize, default en
      walletSort={["Particle Auth", "Wallet"]} //optional：walelt order
      particleAuthSort={[
        //optional：display particle auth items and order
        "email",
        "phone",
        "google",
        "apple",
        "facebook",
      ]}
    >
      <Provider store={store}>
        <ContractProvider>
          <TradeVerseProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </TradeVerseProvider>
        </ContractProvider>
      </Provider>
    </ModalProvider>
  );
}
