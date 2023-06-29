import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Cart from "./cart/Cart";
import Tracking from "./cart/Tracking";
import History from "./cart/History";

const CartSection = () => {
  const router = useRouter();
  const [active, setActive] = useState("cart");
  return (
    <div>
      <div className="flex  m-6 items-center text-start space-x-7">
        <button onClick={() => router.back()} className="cursor-pointer bg-white/40 p-3 rounded-full">
          <FaArrowLeft />
        </button>
        <a href="#cart">
          <button
            onClick={() => setActive("cart")}
            className={`${
              active === "cart"
                ? "border-b-2 w-[70px] py-4 border-[#00B86B]"
                : "border-none"
            } text-[16px] w-full leading-[24px] text-center font-semibold`}
          >
            Carts
          </button>
        </a>
        <a href="#tracking">
          <button
            onClick={() => setActive("tracking")}
            className={`${
              active === "tracking"
                ? "border-b-2 w-[70px] py-4 border-[#00B86B]"
                : "border-none"
            } text-[16px] w-full leading-[24px] text-center font-semibold`}
          >
            Order Tracking
          </button>
        </a>
        <a href="#history">
          <button
            onClick={() => setActive("history")}
            className={`${
              active === "history"
                ? "border-b-2 w-[70px] py-4 border-[#00B86B]"
                : "border-none"
            } text-[16px] w-full leading-[24px] text-center font-semibold`}
          >
            History
          </button>
        </a>
      </div>
      {active == "cart" && <Cart />}
      {active === "tracking" && <Tracking />}
      {active === "history" && <History />}
    </div>
  );
};

export default CartSection;
