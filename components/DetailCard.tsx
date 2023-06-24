import { icon } from "@/assets";
import { useTradeContext } from "@/context";
import React, { useEffect, useState } from "react";
import {
  BsChatTextFill,
  BsChevronDown,
  BsChevronRight,
  BsDot,
} from "react-icons/bs";
import { FaArrowRight, FaChevronRight } from "react-icons/fa";
import Button from "./Button";
import Image from "next/image";
import { useContractContext } from "@/context/ContractProvider";
import { ethers } from "ethers";
import { convertToEthereum } from "@/constant/convertionUtils";
import { formatCurrency, getGasPrice } from "@/constant/cryptoApi";
import Link from "next/link";

interface Product {
  name: string;
  desc: string;
  image: never[];
  price: number;
  category: string;
  pid: number;
  quantity: number;
  location: string;
  max: number;
  owner: string;
  refund: number;
  active: boolean
  id: string
}
interface Props {
  item: Product;
}

const DetailCard = ({ item }: Props) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { handleAddToCart, handleUpdateQuantity } = useTradeContext();
  const [ethereumPrice, setEthereumPrice] = useState<string>("");
  const [active, setActive] = useState({
    isActive: false,
    activeRoute: "",
  });
  const [isActive ,setIsActive] = useState(false)
  const { placeOrder, isSellerActive } = useContractContext();
  console.log(ethereumPrice)

  const [transactionFee, setTransactionFee] = useState<number | null>(null);

  const handlePurchase = async () => {
    await placeOrder(
      item.pid,
      ethereumPrice
    );
  };


  useEffect(() => {
    async function getEthereumPrice() {
      try {
        const ethereumAmount = await convertToEthereum(
          item.price,
          "ethereum",
          "usd"
        );
        setEthereumPrice(ethereumAmount);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    getEthereumPrice();
  }, [item.price]);

  useEffect(() => {
    // Fetch the gas price and calculate the transaction fee
    getGasPrice()
      .then((gasPrice: ethers.BigNumber) => {
        const gasLimit = 21000; // Replace with the appropriate gas limit for your transaction
        const fee = gasPrice.mul(gasLimit);
        const transactionFee = parseFloat(ethers.utils.formatEther(fee));
        setTransactionFee(transactionFee);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  useEffect(() => {
  const tx = isSellerActive(item.owner)
  console.log(tx)
  }, [item.owner])

  const formattedTransactionFee = formatCurrency(transactionFee, "USD");

  const transFee = formattedTransactionFee !== null ? formattedTransactionFee.toFixed(0) : "N/A"
  console.log(transFee)

  const calculateTotalAmount = () => {
  
    const fee = transactionFee !== null ? transactionFee : 0; // Set fee to 0 if transactionFee is null
  
    const total = fee + item.price + 3;
    return total;
  }
  
  useEffect(() => {
    const total = calculateTotalAmount();
    setTotalAmount(total);
  }, []);

  const info = [
    {
      title: "Product description",
      info: item?.desc,
      active: "product",
    },
    {
      title: "Seller information",
      info: item?.desc,
      active: "seller",
    },
  ];
  return (
    <div className="border-2  relative border-Foundation px-4 py-2.5 h-[790px] w-[640px]">
      <div className="flex flex-col mt-8 mx-9 items-start">
        <div className="border-b-2 pb-6 flex flex-col items-start w-full border-Foundation">
          <span className="text-[18px] font-normal">{item?.name}</span>
          <span className="text-[24px] font-bold">
            {item?.price} - {ethereumPrice}
          </span>
          <div className="flex items-center text-center space-x-">
            <BsDot className="text-green text-xl" />
            <span className="text-[14px] font-medium">{item?.location}</span>
          </div>
        </div>

        <div className="absolute top-0 right-0  ">
          {item.active === true && (
            <Link href={`/meet/${item.id}`} className="bg-[#F90000] p-[14px] flex items-center justify-end space-x-2">
              <span>Seller is Live</span>
              <FaArrowRight size={16} />
            </Link>
          )}
        </div>

        <div className="flex flex-col items-start border-b-2 border-Foundation py-6 w-full">
          <div className="flex items-center justify-between space-x-8 w-full">
            <div className="flex flex-col space-y-[10.5px] items-start">
              <span className="text-Foundation text-[16px] leading-[24px] font-bold">
                Price:
              </span>
              <span className="flex items-center space-x-2 text-Foundation text-[16px] leading-[24px] font-bold">
                Transaction fees:
                <Image src={icon} alt="icon" />
              </span>
              <span className="flex items-center space-x-2 text-Foundation text-[16px] leading-[24px] font-bold">
                Shipping fees:
                <Image src={icon} alt="icon" />
              </span>
              <h3 className="text-[#fff] text-[24px] leading-[28.13px] font-bold">
                Total
              </h3>
            </div>
            <div className="flex flex-col items-center space-y-[10.5px]">
              <span className="text-Foundation text-[16px] leading-[24px] font-bold">
                {item?.price}
              </span>
              <span className="text-Foundation text-[16px] leading-[24px] font-bold">
                {formattedTransactionFee}
              </span>
              <span className="text-Foundation text-[16px] leading-[24px] font-bold">
                $3
              </span>
              <span className="text-[#fff] text-[24px] leading-[28.33px] font-bold">
                ${item.price + transFee + 3}
              </span>
            </div>
            <div className="flex flex-col items-center space-y-[10.5px]">
              <span className="text-Foundation text-[16px] leading-[24px] font-bold">
                {ethereumPrice} ETH
              </span>
              <span className="text-Foundation text-[16px] leading-[24px] font-bold">
                {transactionFee}
              </span>
              <span className="text-Foundation text-[16px] leading-[24px] font-bold">
                $3
              </span>
              <span className="text-[#fff] text-[24px] leading-[28.33px] font-bold">
                {totalAmount}
              </span>
            </div>
          </div>
        </div>

        <div className="flex border-b-2 border-[#fff] w-full py-6 flex-col space-y-[16px">
          <div className="flex  items-center justify-around w-full mt-6 space-x-4">
            <span className="text-[18px] font-bold">Quantity:</span>
            <div className="border-4 text-[16px] font-bold border-Bar rounded-[8px] w-[123px] flex items-center h-[48px]">
              <span
                onClick={() => handleUpdateQuantity(item.quantity, -1)}
                className="border-r-4 px-4 py-2.5 border-Bar text-Foundation"
              >
                -
              </span>
              <span className="text-[#fff] px-4 py-2.5">{item?.quantity}</span>
              <span
                onClick={() => handleUpdateQuantity(item.quantity, 1)}
                className="border-l-4 border-Bar text-Foundation px-4 py-2.5"
              >
                +
              </span>
            </div>
            <button
              onClick={() => handleAddToCart(item)}
              className="border-2 border-green px-[12px] py-[16px] text-[18px] leading-[24px] font-bold rounded-[40px]"
            >
              Add to Cart
            </button>
          </div>
          <div className="flex items-center justify-between w-full mt-6">
            <Button title="Buy" isFunc handleClick={handlePurchase} />
            <div className="bg-green p-[18px] cursor-pointer rounded-full">
              <BsChatTextFill size={25} />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-9 mt-9 items-start w-full">
          {info.map((item, i) => (
            <div key={i} className="w-full">
              <div
                onClick={() =>
                  setActive({
                    activeRoute: item.active,
                    isActive: !active,
                  })
                }
                className="flex items-center space-x-[30%] justify-between w-full"
              >
                <h1 className="text-[18px] font-bold leading-[21px]">
                  {item.title}
                </h1>
                {active ? <BsChevronDown /> : <BsChevronRight />}
              </div>

              {active && <p>{item.info}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
