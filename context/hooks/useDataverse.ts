"use client";
import { useEffect, useState } from "react";
import {
  RuntimeConnector,
  Extension,
  WALLET,
  RESOURCE,
  StreamContent,
  StreamObject,
  Mode,
} from "@dataverse/runtime-connector";
import { SignMethod } from "@dataverse/runtime-connector";
import { toast } from "react-toastify";
import Store from "../Store.json";

export function useDataverse() {
  const isBrowser = typeof window !== "undefined";
  const StoreAddress = "0xe8F4697dc0A02AA3AF4DAE620df54D1EF31EEf80";

  useEffect(() => {
    if (isBrowser) {
      import("@dataverse/runtime-connector").then((module) => {
        const RuntimeConnector = module.RuntimeConnector;
        setRuntimeConnector(new RuntimeConnector(Extension));
      });
    }
    connectWallet();
  }, [isBrowser]);

  const appName = "TradeverseOfficialEcommerces";
  const [runtimeConnector, setRuntimeConnector] = useState<RuntimeConnector>();
  const [pkh, setPkh] = useState<string | undefined>("");

  async function initiateCapability() {
    const res = await checkCapability();
    if (res === false) {
      toast.error(
        "you havent connceted to the dataverse network, pls wait for metamsk pop up"
      );
      await createCapability(WALLET.METAMASK);
    }
  }

  async function connectWallet(): Promise<WALLET | undefined> {
    try {
      const res = await runtimeConnector?.connectWallet(WALLET.METAMASK);
      await runtimeConnector?.switchNetwork(80001);
      initiateCapability();
      setPkh(res?.address);
      return res?.wallet;
    } catch (error) {
      console.error(error);
    }
  }

  async function startAStream(callId: string) {
    try {
      await connectWallet();
      await initiateCapability();
      const res = await runtimeConnector?.contractCall({
        contractAddress: StoreAddress,
        abi: Store.abi,
        method: "startStream",
        params: [callId],
        mode: Mode.Write,
      });
      toast.success("Your call start any minute from now");
    } catch (error) {
      toast.error(
        "Failed, Pls install dataverse Wallet and make sure you have some matic in wallet"
      );
      console.log(error);
    }
  }

  async function cancelStream() {
    try {
      await connectWallet();
      await initiateCapability();
      const res = await runtimeConnector?.contractCall({
        contractAddress: StoreAddress,
        abi: Store.abi,
        method: "cancelStream",
        params: [],
        mode: Mode.Write,
      });
      toast.success("Call cancelled successfully");
    } catch (error) {
      toast.error("something went wrong");
    }
  }

  async function creatAStore(storeData: {
    storename: string;
    category: string;
    description: string;
    location: string;
    profileImage: string;
    coverImage: string;
  }) {
    const {
      category,
      coverImage,
      description,
      location,
      profileImage,
      storename,
    } = storeData;
    try {
      await connectWallet();
      await initiateCapability();
      const res = await runtimeConnector?.contractCall({
        contractAddress: StoreAddress,
        abi: Store.abi,
        method: "createAStore",
        params: [
          storename,
          category,
          description,
          location,
          profileImage,
          coverImage,
        ],
        mode: Mode.Write,
      });
      toast.success("Store Created successfully");
    } catch (error) {
      toast.error(
        "Failed, Pls install dataverse Wallet and make sure you have some matic in wallet"
      );
    }
  }

  async function acceptTermsAndConditions() {
    try {
      initiateCapability();
      await runtimeConnector?.sign({
        method: SignMethod.signMessage,
        params: [
          "I acknowledge that i accept the terms and conditions of Tradverse Ecommerce platform",
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function sendNotification(notification: any) {
    initiateCapability();
    await runtimeConnector?.createStream({
      modelId:
        "kjzl6hvfrbw6c5pvzkeqj9a9l6ex0w1azrfwgphrdda2zqt761okm49g4qi0ock",
      streamContent: { notification },
    });
  }

  async function createStore(storeData: {
    storename: string;
    location: string;
    category: string;
    profileImage: string;
    coverImage: string;
    description: string;
  }): Promise<void> {
    const {
      storename,
      location,
      category,
      profileImage,
      coverImage,
      description,
    } = storeData;
    initiateCapability();
    await runtimeConnector?.createStream({
      modelId:
        "kjzl6hvfrbw6cavewkq8smhhpvbhazsz3kjr1015l8qn4ony486qt8b9qv3w57x", // Replace with the actual model ID for your store model
      streamContent: {
        //appVersion: "0.2.0",
        storename,
        location,
        category,
        profileImage,
        coverImage,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  const createCapability = async (wallet: WALLET) => {
    const currentPkh = await runtimeConnector?.createCapability({
      wallet,
      app: appName,
    });
    setPkh(currentPkh);
    console.log(currentPkh);
    return currentPkh;
  };

  async function getAllStores(): Promise<any[]> {
    const streams = await runtimeConnector?.loadStreamsBy({
      modelId:
        "kjzl6hvfrbw6cavewkq8smhhpvbhazsz3kjr1015l8qn4ony486qt8b9qv3w57x",
    });
    console.log(streams);
    if (Array.isArray(streams)) {
      return streams.map((stream: any) => stream?.content) || [];
    } else {
      return [];
    }
  }

  const checkCapability = async () => {
    const res = await runtimeConnector?.checkCapability({
      app: appName,
    });
    console.log(res);
    return res;
  };

  return {
    connectWallet,
    createStore,
    getAllStores,
    createCapability,
    checkCapability,
    pkh,
    sendNotification,
    acceptTermsAndConditions,
    creatAStore,
    startAStream,
    cancelStream
  };
}
