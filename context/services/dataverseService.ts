"use client";
import {
  RuntimeConnector,
  Extension,
  WALLET,
  RESOURCE,
} from "@dataverse/runtime-connector";
import { Console } from "console";

const isBrowser = typeof window !== "undefined";

export const appName = "Tradeverseofficial";

export async function connectWallet(): Promise<WALLET | undefined> {
  try {
    if (isBrowser) {
      const runtimeConnector = new RuntimeConnector(Extension);
      const res = await runtimeConnector.connectWallet(WALLET.METAMASK);
      const capability = await runtimeConnector.checkCapability({
        app: appName,
      });
      if (!capability) {
        await runtimeConnector.createCapability({
          app: appName,
          wallet: WALLET.METAMASK,
        });
      }
      return res.wallet;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function createStore(storeData: {
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
  if (isBrowser) {
    const runtimeConnector = new RuntimeConnector(Extension);
    await runtimeConnector.connectWallet(WALLET.METAMASK);
    await runtimeConnector.createStream({
      modelId:
        "kjzl6hvfrbw6c5m7wy2ca6q4le7ihjczo1cx65wvzonrcg1c53l0kk6c7j50b8r", // Replace with the actual model ID for your store model
      streamContent: {
        // appVersion: "0.0.1",
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
}

export async function getAllStores(): Promise<any[]> {
  if (isBrowser) {
    const runtimeConnector = new RuntimeConnector(Extension);
    const streams = await runtimeConnector.loadStreamsBy({
      modelId:
        "kjzl6hvfrbw6c5m7wy2ca6q4le7ihjczo1cx65wvzonrcg1c53l0kk6c7j50b8r",
    });
    console.log(streams);
    if (Array.isArray(streams)) {
      return streams.map((stream: any) => stream?.content) || [];
    } else {
      return [];
    }
  }
  return [];
}
