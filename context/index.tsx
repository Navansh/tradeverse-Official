import { useContext, createContext, useState, useEffect } from "react";
import {
  RuntimeConnector,
  Extension,
  WALLET,
} from "@dataverse/runtime-connector";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/cartSlice";
import { RootState } from "../redux/store";
import { CartItem } from "../types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

interface TradeVerseNode {
  children: React.ReactNode;
}

interface TradeVerseContextType {
  address: String | undefined;
  setAddress: React.Dispatch<React.SetStateAction<String | undefined>>;
  handleAddToCart: (item: any) => void;
  handleUpdateQuantity: (itemId: number, quantity: number) => void;
  getRoomId: () => Promise<any>;
}

const TradeVerse = createContext<TradeVerseContextType | null>(null);

export const TradeVerseProvider: React.FC<TradeVerseNode> = ({ children }) => {
  const [address, setAddress] = useState<String | undefined>("");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  console.log(cartItems);
  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };
  const handleUpdateQuantity = (itemId: number, change: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      dispatch(updateQuantity({ itemId, quantity: newQuantity }));
    }
    console.log(item);
  };

  useEffect(() => {
    const getAddress = async () => {
      if (typeof window != "undefined") {
        const runtimeConnector = new RuntimeConnector(Extension);
        const pkh = await runtimeConnector.wallet.getCurrentPkh(
           
        );
        console.log(pkh);
      }
    };
    getAddress()
  }, []);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const getRoomId = async () => {
    try {
      const { data } = await axios.post(
        "https://iriko.testing.huddle01.com/api/v1/create-iframe-room",
        {
          title: "Huddle01-Test",
          roomLocked: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "QQ7Ri5fKZssD9DLrvSBlQxyDed6GEnVk",
          },
        }
      );
      console.log(data);
      return data.data.roomId;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const router = useRouter();

  useEffect(() => {
    const checkUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          router.push("/");
        }
      });
    };
  });

  const contextValue: TradeVerseContextType = {
    address,
    setAddress,
    handleAddToCart,
    handleUpdateQuantity,
    getRoomId,
  };

  return (
    <TradeVerse.Provider value={contextValue}>{children}</TradeVerse.Provider>
  );
};

export const useTradeContext = (): TradeVerseContextType => {
  const context = useContext(TradeVerse);

  if (context === null) {
    throw new Error("useTradeContext must be used within a TradeVerseProvider");
  }

  return context;
};
