import { createContext, useEffect, useState, useContext } from "react";
import productJson from "./Products.json";
import {
  Extension,
  Mode,
  RuntimeConnector,
  WALLET,
} from "@dataverse/runtime-connector";
import { ethers } from "ethers";
import connectWithContract from "@/constant";
import { useAccount, useAccountInfo } from "@particle-network/connect-react-ui";

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
    _description: string,
    _location: string
  ) => Promise<void>;
  storeDetail: {};
}

const ContractContext = createContext<ContractContextTypes | null>(null);

export const ContractProvider = ({ children }: ContractChildren) => {
  const ProductContract = "0xeCC0dCAe75d9AD3bE9Dafd358605f2cFCbDBBd49";
  const productAbi = productJson.abi;
  const account = useAccount();
  const [storeDetail, setStoreDetails] = useState([]);
  console.log(storeDetail);

  const createAStore = async (
    _storeName: string,
    _category: string,
    _name: string,
    _lastName: string,
    _description: string,
    _location: string
  ) => {
    try {
      const contract = await connectWithContract();
      const tx = await contract.createAStore(
        _storeName,
        _category,
        _name,
        _lastName,
        _description,
        _location
      );
      console.log(tx);
      await tx.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const getStoreDetails = async () => {
    try {
      // Call the getStoreDetails() function from the smart contract
      const result = await connectWithContract();
      const tx = await result.getStoreDetails();
      // Handle the returned result as needed
      console.log(tx); // or return result; or perform any other actions
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStoreDetails()
  }, [])

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
    storeDetail,
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
    throw new Error(
      "useContractContext must be used within a TradeVerseProvider"
    );
  }

  return context;
};
