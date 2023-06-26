import connectWithContract from "@/constant/contract";
import { useContext, createContext, useState, useEffect } from "react";
import Store from "./Stores.json";
import { useAccount } from "@particle-network/connect-react-ui";
import { toast } from "react-toastify";

interface ContextNode {
  children: React.ReactNode;
}

interface ContextProps {
  createStore: (
    storeName: string,
    category: string,
    name: string,
    lastNmae: string,
    description: string,
    location: string
  ) => Promise<void>;
  startAStream: (roomId: string) => Promise<void>;
  cancelAStream: (id: number) => Promise<void>;
  isLoading: boolean
}

const StoreContext = createContext<ContextProps | null>(null);


export const StoreProvider = ({ children }: ContextNode) => {
  const StoreAddress = "0x17d8A59d79c1562a081ac4D642DaEEA3b64fBAbC";
  const contractInitiate = connectWithContract(StoreAddress, Store.abi);
  const account = useAccount();
  
  //STATE
  const [allStream, setAllStream] = useState([]);
  const [ALLStore, setAllStoe] = useState([]);
  const [userStore, setUserStore] = useState();
  const [stream, setStream] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createStore = async (
    storeName: string,
    category: string,
    name: string,
    lastNmae: string,
    description: string,
    location: string
  ) => {
    try {
      const contract = await contractInitiate.createAStore(
        storeName,
        category,
        name,
        lastNmae,
        description,
        location
      );
      setIsLoading(true);
      await contract.wait();
      setIsLoading(false);
      console.log(contract);
    } catch (error) {
      console.log(error);
    }
  };

  const startAStream = async (roomId: string) => {
    try {
      const contract = contractInitiate.startStream(roomId);
      setIsLoading(true);
      await contract.wait();
      setIsLoading(false);
      console.log(contract);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAStream = async (id: number) => {
    try {
      const contract = contractInitiate.cancelStream(id);
      setIsLoading(true);
      await contract.wait();
      setIsLoading(false);
      toast.success("stream Cancelled successfully", {
        position: "bottom-right",
      });
      console.log(contract);
    } catch (error) {
      console.log(error);
    }
  };

  //READ FUNCTIONS

  const fetchStoreByAddress = async () => {
    try {
      const contract = contractInitiate.getStoreByAddress(account);
      console.log(contract);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStream = async () => {
    try {
      const contract = contractInitiate.retriveStreamInfo(account);
      console.log(contract);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllStream = async () => {
    try {
      const contract = contractInitiate.getAllStream();
      console.log(contract);
    } catch (error) {
      console.log(error);
    }
  };

  //USE EFFECT

  useEffect(() => {
    fetchAllStream();
    fetchStoreByAddress();
    fetchStream();
  }, [account]);

  const value = {
    createStore,
    startAStream,
    cancelAStream,
    isLoading
  };
  return <StoreContext.Provider value={value}></StoreContext.Provider>;
};

export const useStoreContext = (): ContextProps => {
  const context = useContext(StoreContext);

  if (context === null) {
    throw new Error(
      "useContractContext must be used within a TradeVerseProvider"
    );
  }

  return context;
};
