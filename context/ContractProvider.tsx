import { createContext, useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { useAccount } from "@particle-network/connect-react-ui";
import { toast } from "react-toastify";
import connectWithContract from "@/constant/contract";
import Product from "./Products.json";

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
  placeOrder: (id: number, _price: string) => Promise<void>;
  storeDetail: never[];
  currentUserStore: never[];
  userProduct: never[];
  allProduct: never[];
  productByAddress: (id: string) => Promise<any>;
  isLoading: boolean;
  setSellerIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  sellerIsActive: boolean;
  fetchSellerProduct: (address: string) => Promise<any>;
  sellerProduct: never[];
}

const ContractContext = createContext<ContractContextTypes | null>(null);

export const ContractProvider = ({ children }: ContractChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const account = useAccount();
  const [storeDetail, setStoreDetails] = useState([]);
  const [currentUserStore, setcurrentUserStore] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [userProduct, setUserProduct] = useState([]);
  const [liveEvent, setLiveEvent] = useState([]);
  const [sellerProduct, setSellerProduct] = useState([]);
  const [sellerIsActive, setSellerIsActive] = useState(false);
  //console.log(currentUserStore);

  const ProductAddress = "0xa05AEF4B573998391cC604D99CE7689aaE73c6ec";

  const createAStore = async (
    _storeName: string,
    _category: string,
    _name: string,
    _lastName: string,
    _description: string,
    _location: string
  ) => {
    try {
      const contract = await connectWithContract(ProductAddress, Product.abi);
      setIsLoading(true);
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
      setIsLoading(false);
      toast.success("Store successfully Created");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const productByAddress = async (id: string) => {
    try {
      const result = await connectWithContract(ProductAddress, Product.abi);
      const tx = await result.getProductByAddress(id);
      console.log(tx);
      return tx;
    } catch (error) {
      console.error(error);
      return []; // Return an empty array in case of error
    }
  };

  const getProductDetails = async () => {
    try {
      const result = await connectWithContract(ProductAddress, Product.abi);
      const tx = await result.getProductDetails();
      console.log(tx);
      const parsedProduct = await tx.map((item: any) => ({
        name: item.name,
        desc: item.descLink,
        image: item.imageLink,
        price: Number(item.price),
        category: item.category,
        pid: Number(item.index),
        quantity: Number(item.quantity),
        location: item.location,
        max: Number(item.maxQuantity),
        owner: item.owner,
        refund: item.refundTimeLimit,
        active: item.sellerActive,
        id: item.meetingId,
      }));
      console.log(parsedProduct);
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
      price: Number(item.price),
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

  const fetchSellerProduct = async (address: string) => {
    try {
      const result = await getProductDetails();
      const userProduct = result.filter((item: any) => item.owner === address);
      const parsedProduct = await userProduct.map((item: any) => ({
        name: item.name,
        desc: item.descLink,
        image: item.imageLink,
        price: Number(item.price),
        category: item.category,
        pid: Number(item.index),
        quantity: Number(item.quantity),
        location: item.location,
        max: Number(item.maxQuantity),
        owner: item.owner,
        refund: Number(item.refundTimeLimit),
      }));
      console.log(parsedProduct);
      console.log(userProduct);
      setSellerProduct(parsedProduct);
      return parsedProduct;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
    filterForUserProduct();
  }, [account]);

  async function placeOrder(id: number, _price: string) {
    try {
      const contract = await connectWithContract(ProductAddress, Product.abi);

      // Convert price to Ether value
      const priceInEther = ethers.utils.parseEther(_price);

      // Specify a gas limit for the transaction (e.g., 200000)
      const gasLimit = 500000;

      // Call the placeOrder function from the smart contract
      const tx = await contract.placeOrder(id, priceInEther, {
        value: priceInEther,
        gasLimit: gasLimit,
      });

      // Wait for the transaction to be confirmed
      await tx.wait();
    } catch (error) {
      console.log(error);
    }
  }

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
      const result = await connectWithContract(ProductAddress, Product.abi);
      setIsLoading(true);
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
      setIsLoading(false);
      toast.success("Product listed sucessfully");
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
    productByAddress,
    isLoading,
    sellerIsActive,
    setSellerIsActive,
    fetchSellerProduct,
    sellerProduct,
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
