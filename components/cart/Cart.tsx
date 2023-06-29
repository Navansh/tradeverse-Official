import { useTradeContext } from "@/context";
import React, { useState } from "react";
import CartCard from "./CartCard";
import Button from "../Button";

const Cart = () => {
  const { cartItems, handleRemoveFromCart } = useTradeContext();
  console.log(cartItems);
  return (
    <div className="ml-[38px] mt-[20px] grid grid-cols-2 items-start gap-[40px]">
      <div className="flex flex-col items-start space-y-[16px]">
        {cartItems.map((item: any, i: number) => (
          <CartCard key={i} {...item} />
        ))}
      </div>
      <div className="min-w-[427px] min-h-[503px] p-[40px] flex flex-col items-start gap-[16px] border border-[#30445B] rounded-[4px]">
        <h1 className="text-[24px] border-b-4 border-green w-full pb-2 font-bold ">
          Cart Summary
        </h1>
        <div className="flex flex-col gap-[16px] items-start w-full">
          {cartItems.map((item: any, i: number) => (
            <div
              key={i}
              className="flex items-center gap-[60px] w-full justify-between"
            >
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>{item.price}</div>
            </div>
          ))}
          <div className="border-t-2 border-[#E6E6E6] pb- h-6 w-full" />
          {cartItems.map((item: any, i: number) => (
            <div
              key={i}
              className="flex items-center gap-[60px] w-full justify-between"
            >
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>{item.price}</div>
            </div>
          ))}
          <div className="border-t-2 border-[#E6E6E6] pb- h-6 w-full" />
          <Button title="Checkout" isFunc />
        </div>
      </div>
    </div>
  );
};

export default Cart;
