import { createContext, useEffect, useState, useContext } from "react";
import productJson from "./Products.json";
import {
  Extension,
  Mode,
  RuntimeConnector,
  WALLET,
} from "@dataverse/runtime-connector";
import { ethers } from "ethers";

interface ContractChildren {
  children: React.ReactNode;
}

interface ContractContextTypes {
  addProduct: (
    _name: string,
    _category: string,
    _imageLink: string,
    _descLink: string,
    _price: ethers.BigNumber,
    _location: string,
    _maxQuantity: number,
    _refundTimeLimit: string
  ) => Promise<void>;
  placeOrder: (id: number, _price: number, _arbiter: string) => Promise<void>;
  createAStore: (
    _storeName: string,
    _category: string,
    _name: string,
    _lastName: string,
    _description: string
  ) => Promise<void>;
}

const ContractContext = createContext<ContractContextTypes | null>(null);

export const ContractProvider = ({ children }: ContractChildren) => {
  const ProductContract = "0x9319A737d7265cd21AFd7bD22Bd7b19a6F8f070F";
  const productAbi = productJson.abi;

  const createAStore = async (
    _storeName: string,
    _category: string,
    _name: string,
    _lastName: string,
    _description: string
  ) => {
    try {
      if (typeof window != "undefined") {
        const runtimeConnector = new RuntimeConnector(Extension);
        await runtimeConnector?.connectWallet(WALLET.METAMASK);
        const res = await runtimeConnector?.contractCall({
          contractAddress: ProductContract,
          abi: productAbi,
          method: "createAStore",
          params: [_storeName, _category, _name, _lastName, _description],
          mode: Mode.Write,
        });
        console.log({ res });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async (id: number, _price: number, _arbiter: string) => {
    try {
      if (typeof window != "undefined") {
        const runtimeConnector = new RuntimeConnector(Extension);
        await runtimeConnector?.connectWallet(WALLET.METAMASK);
        const res = await runtimeConnector?.contractCall({
          contractAddress: ProductContract,
          abi: productAbi,
          method: "placeOrder",
          params: [id, _price, _arbiter],
          mode: Mode.Write,
        });
        console.log({ res });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (
    _name: string,
    _category: string,
    _imageLink: string,
    _descLink: string,
    _price: ethers.BigNumber,
    _location: string,
    _maxQuantity: number,
    _refundTimeLimit: string
  ) => {
    try {
      if (typeof window != "undefined") {
        const runtimeConnector = new RuntimeConnector(Extension);
        await runtimeConnector?.connectWallet(WALLET.METAMASK);
        const res = await runtimeConnector?.contractCall({
          contractAddress: ProductContract,
          abi: productAbi,
          method: "addProduct",
          params: [
            _name,
            _category,
            _imageLink,
            _descLink,
            _price,
            _location,
            _maxQuantity,
            _refundTimeLimit,
          ],
          mode: Mode.Write,
        });
        console.log({ res });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    createAStore,
    addProduct,
    placeOrder,
  };
  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = (): ContractContextTypes => {
  const context = useContext(ContractContext);

  if (context === null) {
    throw new Error("useContractContext must be used within a TradeVerseProvider");
  }

  return context;
};