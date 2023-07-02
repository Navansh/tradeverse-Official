"use client";
import { useEffect, useState } from "react";
import {
  RuntimeConnector,
  Extension,
  WALLET,
  RESOURCE,
} from "@dataverse/runtime-connector";

export function useDataverse() {
  const isBrowser = typeof window !== "undefined";

  const appName = "TradeverseOfficialEcommerce";
  const [runtimeConnector, setRuntimeConnector] = useState<RuntimeConnector>();
  const [pkh, setPkh] = useState<string | undefined>("");

  useEffect(() => {
    if (isBrowser) {
      import("@dataverse/runtime-connector").then((module) => {
        const RuntimeConnector = module.RuntimeConnector;
        setRuntimeConnector(new RuntimeConnector(Extension));
      });
    }
  }, [isBrowser]);

  async function connectWallet(): Promise<WALLET | undefined> {
    try {
      const res = await runtimeConnector?.connectWallet(WALLET.METAMASK);
      await runtimeConnector?.switchNetwork(80001);
      await runtimeConnector?.checkCapability({
        app: appName,
      });
      await runtimeConnector?.createCapability({
        app: appName,
        wallet: WALLET.METAMASK,
      });
      return res?.wallet;
    } catch (error) {
      console.error(error);
    }
  }

  async function sendNotification(notification: any) {
    await runtimeConnector?.createCapability({
      app: appName,
      wallet: WALLET.METAMASK,
    });
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
    await runtimeConnector?.createCapability({
      app: appName,
      wallet: WALLET.METAMASK,
    });
    await runtimeConnector?.createStream({
      modelId:
        "kjzl6hvfrbw6c6mcmmbwz7b4x3kn2qmcocg2hbdb6doudo69mitz3zsn7e8238n", // Replace with the actual model ID for your store model
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
    const streams = await runtimeConnector?.loadStream(
      "kjzl6hvfrbw6c6mcmmbwz7b4x3kn2qmcocg2hbdb6doudo69mitz3zsn7e8238n"
    );
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
  };
}
