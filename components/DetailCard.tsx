import { icon } from '@/assets'
import { useTradeContext } from '@/context'
import React, { useState } from 'react'
import { BsChatTextFill, BsChevronDown, BsChevronRight, BsDot } from 'react-icons/bs'
import { FaChevronRight } from 'react-icons/fa'
import Button from './Button'
import Image from 'next/image'

interface Props {
    item: any
}

const DetailCard = ({ item }: Props) => {
    const { handleAddToCart, handleUpdateQuantity } = useTradeContext()
    const [active, setActive] = useState({
        isActive: false,
        activeRoute: ""
      });
      
  function formatEthValue(ethValue: any, decimalPlaces: number) {
    const formattedValue = parseFloat(ethValue).toFixed(decimalPlaces);
    return formattedValue;
  }

  function convertToEthereum(dollarAmount: any) {
    const ethConversionRate = 3500; // Fixed conversion rate: 1 ETH = 3500 USD
    const ethereumAmount = dollarAmount / ethConversionRate;
    return formatEthValue(ethereumAmount, 4);
  }

  
  const info = [
    {
      title: "Product description",
      info: item?.description,
      active: "product",
    },
    {
      title: "Seller information",
      info: item?.description,
      active: "seller",
    },
  ];
  return (
    <div className="border-2  relative border-Foundation px-4 py-2.5 h-[790px] w-[640px]">
    {item?.isSellerActive && (
      <button className="absolute top-0 animate-pulse transition-all duration-500 cursor-pointer bg-[#F90000] right-0 text-center flex items-center space-x-6 px-5 py-2.5">
        <span>Seller is Live</span>
        <FaChevronRight />
      </button>
    )}
    <div className="flex flex-col mt-8 mx-9 items-start">
      <div className="border-b-2 pb-6 flex flex-col items-start w-full border-Foundation">
        <span className="text-[18px] font-normal">{item?.title}</span>
        <span className="text-[24px] font-bold">{item?.price}</span>
        <div className="flex items-center text-center space-x-">
          <BsDot className="text-green text-xl" />
          <span className="text-[14px] font-medium">{item?.location}</span>
        </div>
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
              $13
            </span>
            <span className="text-Foundation text-[16px] leading-[24px] font-bold">
              $1
            </span>
            <span className="text-Foundation text-[16px] leading-[24px] font-bold">
              $3
            </span>
            <span className="text-[#fff] text-[24px] leading-[28.33px] font-bold">
              ${13 + 1 + 3}
            </span>
          </div>
          <div className="flex flex-col items-center space-y-[10.5px]">
            <span className="text-Foundation text-[16px] leading-[24px] font-bold">
              {convertToEthereum(13)}ETH
            </span>
            <span className="text-Foundation text-[16px] leading-[24px] font-bold">
              {convertToEthereum(1)}ETH
            </span>
            <span className="text-Foundation text-[16px] leading-[24px] font-bold">
              {convertToEthereum(3)}ETH
            </span>
            <span className="text-[#fff] text-[24px] leading-[28.33px] font-bold">
              {convertToEthereum(13 + 1 + 3)}ETH
            </span>
          </div>
        </div>
      </div>

      <div className="flex border-b-2 border-[#fff] w-full py-6 flex-col space-y-[16px">
        <div className="flex  items-center justify-around w-full mt-6 space-x-4">
          <span className="text-[18px] font-bold">Quantity:</span>
          <div className="border-4 text-[16px] font-bold border-Bar rounded-[8px] w-[123px] flex items-center h-[48px]">
            <span onClick={() => handleUpdateQuantity(item.id, -1)}  className="border-r-4 px-4 py-2.5 border-Bar text-Foundation">
              -
            </span>
            <span className="text-[#fff] px-4 py-2.5">{item?.quantity}</span>
            <span onClick={() => handleUpdateQuantity(item.id, 1)} className="border-l-4 border-Bar text-Foundation px-4 py-2.5">
              +
            </span>
          </div>
          <button onClick={() => handleAddToCart(item)} className="border-2 border-green px-[12px] py-[16px] text-[18px] leading-[24px] font-bold rounded-[40px]">
            Add to Cart
          </button>
        </div>
        <div className="flex items-center justify-between w-full mt-6">
          <Button title="Buy" isFunc />
          <div className="bg-green p-[18px] cursor-pointer rounded-full">
            <BsChatTextFill size={25} />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-9 mt-9 items-start w-full">
        {info.map((item, i) => (
          <div key={i} className="w-full">
            <div onClick={() => setActive({
              activeRoute: item.active,
              isActive: !active
            })} className="flex items-center space-x-[30%] justify-between w-full">
                <h1 className="text-[18px] font-bold leading-[21px]">{item.title}</h1>
                {active ? (
                  <BsChevronDown  />
                ) : (
                  <BsChevronRight />
                )}
            </div>

            {active && <p>{item.info}</p>}
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default DetailCard