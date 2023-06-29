import connectWithContract from "@/constant/contract";
import { useContext, createContext, useState, useEffect } from "react";
import Store from "./Store.json";
import { useAccount } from "@particle-network/connect-react-ui";
import { toast } from "react-toastify";
import { text } from "stream/consumers";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase";

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
  userStore: Message[] | undefined;
  stream: never[];
  fetchStream: (address: string) => Promise<void>;
  allStream: never[];
  allStore: Message[] | undefined;
  fetchSellerStore: (address: string) => Promise<any>;
}

interface Message {
  id: string;
  profile: string;
  desc: string;
  location: string;
  cover: string;
  category: string;
  storeName: string;
  owner: string;
}

const StoreContext = createContext<ContextProps | null>(null);

export const StoreProvider = ({ children }: ContextNode) => {
  const StoreAddress = "0x4D4AFFb350B2e45c024f609C848b3b4D427DD7db";
  const contractInitiate = connectWithContract(StoreAddress, Store.abi);
  const account = useAccount();
  console.log(account);

  //STATE
  const [allStream, setAllStream] = useState([]);
  const [allStore, setAllStore] = useState<Message[] | undefined>([]);
  const [userStore, setUserStore] = useState<Message[] | undefined>([]);
  const [stream, setStream] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const createStore = async (
    storeName: string,
    category: string,
    description: string,
    location: string,
    profile: string,
    coverImage: string
  ) => {
    try {
      const contract = await contractInitiate;
      const tx = await contract.createAStore(
        storeName,
        category,
        description,
        location,
        profile,
        coverImage
      );
      setIsLoading(true);
      const receipt = await contract.wait();
      setIsLoading(false);
      // console.log(contract);
    } catch (error) {
      console.log(error);
    }
  };

  const startAStream = async (roomId: string) => {
    try {
      const contract = await contractInitiate;
      const tx = await contract.startStream(roomId);
      setIsLoading(true);
      await contract.wait();
      setIsLoading(false);
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAStream = async () => {
    try {
      const contract = contractInitiate;
      const tx = await contract.cancelStream();
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
      const contract = await contractInitiate;
      const tx = await contract?.getAllStore();
      console.log(tx);
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllData = () => {
    const q = collection(db, "Store");

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let stores: Message[] = [];
      querySnapshot.forEach((doc) => {
        stores.push({ ...doc.data(), id: doc.id } as Message);
      });
      // Process the retrieved messages here
      console.log(stores);
      setAllStore(stores);
    });
    return () => unsubscribe();
  };

  const filterForUserStore = async () => {
    try {
      const userStore = allStore?.filter(
        (item: Message | undefined) => item?.owner === account
      );
      console.log(userStore);
      setUserStore(userStore);
    } catch (error) {
      console.log(error);
    }
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
      setAllStream(tx);
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

  const fetchSellerStore = async (address: string) => {
    try {
      const contract = contractInitiate;
      const tx = await contract.getStoreByAddress(address);
      console.log(tx);
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  //USE EFFECT

  useEffect(() => {
    fetchAllStream();
    fetchStoreByAddress();
    filterForUserStore();
    filterForUserStreamData();
    getAllData();
  }, [account]);

  const value = {
    createStore,
    startAStream,
    cancelAStream,
    isLoading,
    userStore,
    stream,
    fetchStream,
    allStream,
    allStore,
    fetchSellerStore,
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
