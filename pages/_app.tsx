import { TradeVerseProvider } from "@/context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ModalProvider } from "@particle-network/connect-react-ui";
import { WalletEntryPosition } from "@particle-network/auth";
import { Polygon, PolygonMumbai } from "@particle-network/common";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContractProvider } from "@/context/ContractProvider";
import { StoreProvider } from "@/context/StoreContext";
import { evmWallets } from "@particle-network/connect";
import { Chat, ENV } from "@pushprotocol/uiweb";
import { ITheme } from "@pushprotocol/uiweb";
import { ethers } from "ethers";
import { particleProvider } from "@/constant/contract";

export default function App({ Component, pageProps }: AppProps) {
  // Creating a new web3 provider with window.ethereum
  const provider = new ethers.providers.Web3Provider(particleProvider, "any");

  // Getting the signer
  const signer = provider.getSigner();
  return (
    <ModalProvider
      options={{
        projectId: "a581fe1b-809a-40f9-a9e5-6ac8683695fc",
        clientKey: "ccyYA3EfVgH6LjvwxCbdi4E3qdkzjRmZR3t4c0Ot",
        appId: "9fcfcc9f-a1c7-41eb-afaa-939befdd3b33",
        chains: [Polygon, PolygonMumbai],
        particleWalletEntry: {
          //optional: particle wallet config
          displayWalletEntry: true, //display wallet button when connect particle success.
          defaultWalletEntryPosition: WalletEntryPosition.BR,
          supportChains: [Polygon, PolygonMumbai],
          customStyle: {}, //optional: custom wallet style
        },
        securityAccount: {
          //optional: particle security account config
          //prompt set payment password. 0: None, 1: Once(default), 2: Always
          promptSettingWhenSign: 1,
          //prompt set master password. 0: None(default), 1: Once, 2: Always
          promptMasterPasswordSettingWhenLogin: 1,
        },
        wallets: evmWallets({ qrcode: false }),
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
            <Chat
          account="0x6430C47973FA053fc8F055e7935EC6C2271D5174" //user address
          supportAddress="0xd9c1CCAcD4B8a745e191b62BA3fcaD87229CB26d" //support address
          signer={signer}
          env={ENV.STAGING}
        />
      <Provider store={store}>
        <ContractProvider>
          <TradeVerseProvider>
            <StoreProvider>
              <Component {...pageProps} />
            </StoreProvider>
            <ToastContainer />
          </TradeVerseProvider>
        </ContractProvider>
      </Provider>
    </ModalProvider>
  );
}
