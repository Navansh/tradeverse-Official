import connectWithContract from "@/constant/contract";
import { useContext, createContext, useState, useEffect } from "react";
import Store from "./Store.json";
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
  isLoading: boolean;
  userStore: never[];
  stream: never[];
  fetchStream: (address: string) => Promise<void>;
  allStream: never[]
}

const StoreContext = createContext<ContextProps | null>(null);

export const StoreProvider = ({ children }: ContextNode) => {
  const StoreAddress = "0xA2B55A915BBe90A828a5B34816Ac7d14C0f3Cc93";
  const contractInitiate = connectWithContract(StoreAddress, Store.abi);
  const account = useAccount();
  console.log(account);

  //STATE
  const [allStream, setAllStream] = useState([]);
  const [ALLStore, setAllStoe] = useState([]);
  const [userStore, setUserStore] = useState([]);
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
      // console.log(contract);
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

  async function addProfileImage() {
    try {
    } catch (error) {}
  }

  const cancelAStream = async () => {
    try {
      const contract = contractInitiate.cancelStream();
      setIsLoading(true);
      await contract.wait();
      setIsLoading(false);
      toast.success("stream Cancelled successfully", {
        position: "bottom-right",
      });
      // console.log(contract);
    } catch (error) {
      console.log(error);
    }
  };

  //READ FUNCTIONS

  const fetchStoreByAddress = async () => {
    try {
      const contract = await contractInitiate;
      const tx = await contract?.getAllStore();
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAvailableStream = async () => {
    try {
      const contract = await contractInitiate;
      const tx = await contract?.getAllStream();
      console.log(tx);
      setAllStream(tx)
    } catch (error) {
      console.log(error);
    }
  };

  const filterForUserStore = async () => {
    const result = await fetchStoreByAddress();
    const userStore = result.filter((item: any) => item.owner === account);
    console.log(userStore);
    const parsedStore = await userStore.map((item: any) => ({
      name: item.name,
      desc: item.description,
      customer: item.customer,
      isActive: item.isSellerActive,
      storeName: item.storeName,
    }));
    console.log(parsedStore);
    setUserStore(parsedStore);
    // console.log(userStore);
  };

  const fetchStream = async (address: string) => {
    try {
      const contract = contractInitiate;
      const tx = await contract.retriveStreamInfo(address);
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllStream = async () => {
    try {
      const contract = contractInitiate;
      const tx = await contract.getAllStream();
      console.log(tx);
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const filterForUserStreamData = async () => {
    const result = await fetchAllStream();
    const userStream = result?.filter((item: any) => item.owner === account);
    console.log(userStream);
    const parsedStream = await userStream.map((item: any) => ({
      isActive: item.isActive,
      storeName: item.storeName,
      streamId: item.streamId,
    }));
    console.log(parsedStream);
    setStream(parsedStream);
  };

  // //FETCH DATA TIME OF PAGE LOAD
  // const fetchData = async () => {
  //   try {
  //     //GET CONTRACT
  //     const contract = await ();
  //     //GET USER NAME
  //     const user = await contract.getUsername();
  //     //GET MY FRIEND LIST
  //     const friendLists = await contract.getMyFriendList();
  //     //GET ALL APP USER LIST
  //     const userList = await contract.getAllAppUser();
  //   } catch (error) {
  //     //setError("Please Install And Connect Your Wallet");
  //     console.log(error);
  //   }
  // };

  //USE EFFECT

  useEffect(() => {
    fetchAllStream();
    fetchStoreByAddress();
    filterForUserStore();
    filterForUserStreamData();
    getAllAvailableStream();
  }, [account]);

  const value = {
    createStore,
    startAStream,
    cancelAStream,
    isLoading,
    userStore,
    stream,
    fetchStream,
    allStream
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
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
