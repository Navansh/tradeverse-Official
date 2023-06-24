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
    _imageLink: string[],
    _descLink: string,
    _price: number,
    _location: string,
    _maxQuantity: number,
    _refundTimeLimit: number
  ) => Promise<void>;
  placeOrder: (id: number, _price: number) => Promise<void>;
  createAStore: (
    _storeName: string,
    _category: string,
    _name: string,
    _lastName: string,
    _description: string,
    _location: string
  ) => Promise<void>;
  storeDetail: never[];
  currentUserStore: never[];
  userProduct: never[];
  allProduct: never[];
  cancelLiveEvent: (id: number) => Promise<any>
  startStream: (callId: string) => Promise<void>
  productByAddress: (id: string) => Promise<any>
  isSellerActive: (id: string) => Promise<any>
}

const ContractContext = createContext<ContractContextTypes | null>(null);

export const ContractProvider = ({ children }: ContractChildren) => {
  const account = useAccount();
  const [storeDetail, setStoreDetails] = useState([]);
  const [currentUserStore, setcurrentUserStore] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [userProduct, setUserProduct] = useState([]);
  const [liveEvent, setLiveEvent] = useState([])
  //console.log(currentUserStore);

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
      const result = await connectWithContract();
      const tx = await result.getStoreDetails();
      // console.log(tx);
      setStoreDetails(tx);
      return tx; // Return the fetched store details
    } catch (error) {
      console.error(error);
      return []; // Return an empty array in case of error
    }
  };

  const productByAddress = async (id: string) => {
    try {
      const result = await connectWithContract();
      const tx = await result.getProductByAddress(id);
      console.log(tx);
      return tx; 
    } catch (error) {
      console.error(error);
      return []; // Return an empty array in case of error
    }
  };

  
  const cancelLiveEvent = async (id: number) => {
    try {
      const result = await connectWithContract();
      const tx = await result.cancelLive(id);
      // console.log(tx);
      return tx; 
    } catch (error) {
      console.error(error);
      return []; // Return an empty array in case of error
    }
  };

  const isSellerActive = async (id: string) => {
    try {
      const result = await connectWithContract();
      const tx = await result.isSellerActive(id);
      // console.log(tx);
      return tx; 
    } catch (error) {
      console.error(error);
      return []; // Return an empty array in case of error
    }
  };

  const getLiveEVnt = async () => {
    try {
      const result = await connectWithContract();
      const tx = await result.getLiveDetail();
      console.log(tx);
      setLiveEvent(tx)
      return tx; 
    } catch (error) {
      console.error(error);
      return []; // Return an empty array in case of error
    }
  };

  const getProductDetails = async () => {
    try {
      const result = await connectWithContract();
      const tx = await result.getProductDetails();
      //console.log(tx);
      const parsedProduct = await tx.map((item: any) => ({
        name: item.name,
        desc: item.descLink,
        image: item.imageLink,
        price: ethers.utils.formatEther(item.price),
        category: item.category,
        pid: Number(item.index),
        quantity: Number(item.quantity),
        location: item.location,
        max: Number(item.maxQuantity),
        owner: item.owner,
        refund: Number(item.refundTimeLimit),
      }));
      // console.log(parsedProduct);
      setAllProduct(parsedProduct);
      return tx; // Return the fetched store details
    } catch (error) {
      console.error(error);
      return []; // Return an empty array in case of error
    }
  };

  const filterForUserProduct = async () => {
    const result = await getProductDetails();
    const userProduct = result.filter((item: any) => item.owner === account);
    const parsedProduct = await userProduct.map((item: any) => ({
      name: item.name,
      desc: item.descLink,
      image: item.imageLink,
      price: ethers.utils.formatEther(item.price),
      category: item.category,
      pid: Number(item.index),
      quantity: Number(item.quantity),
      location: item.location,
      max: Number(item.maxQuantity),
      owner: item.owner,
      refund: Number(item.refundTimeLimit),
    }));
    console.log(parsedProduct);
    setUserProduct(parsedProduct);
    console.log(userProduct);
  };

  const filterForUserStore = async () => {
    const result = await getStoreDetails();
    const userStore = result.filter((item: any) => item.owner === account);
    // console.log(userStore)
    const parsedStore = await userStore.map((item: any) => ({
      name: item.name,
      desc: item.description,
      customer: item.customer,
    }));
    //console.log(parsedStore)
    setcurrentUserStore(userStore);
    console.log(userStore);
  };

  useEffect(() => {
    getStoreDetails();
    filterForUserStore();
    getProductDetails();
    filterForUserProduct();
    getLiveEVnt()
  }, [account]);

  const placeOrder = async (id: number, _price: number) => {
    try {
      const result = await connectWithContract();
      const tx = await result.placeOrder(id, {
        value: ethers.utils.parseEther(_price.toString())
      });
      await tx.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const startStream = async (callId: string) => {
    try {
      const result = await connectWithContract();
      const tx = await result.startStream(callId);
      await tx.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (
    _name: string,
    _category: string,
    _imageLink: string[],
    _descLink: string,
    _price: number,
    _location: string,
    _maxQuantity: number,
    _refundTimeLimit: number
  ) => {
    try {
      const result = await connectWithContract();
      const tx = await result.addProduct(
        _name,
        _category,
        _imageLink,
        _descLink,
        _price,
        _location,
        _maxQuantity,
        _refundTimeLimit
      );
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    createAStore,
    addProduct,
    placeOrder,
    storeDetail,
    currentUserStore,
    userProduct,
    allProduct,
    startStream,
    cancelLiveEvent,
    productByAddress,
    isSellerActive
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
