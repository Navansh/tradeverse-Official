import { logo } from "@/assets";
import { Button } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const Onboard = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-[800px] min-h-[440px] bg-[#253343] flex flex-col items-center justify-center px-[5vw] py-[5vh] md:px-[10vw] md:py-[10vh] rounded-[40px] space-y-[16px]">
        <Image src={logo} alt="logo" className="w-[80px] h-[61px] object-contain" />
        <h2 className="text-[4vw] md:text-[30px] text-center w-full leading-[6vh] font-semibold">
          Welcome to TradeVerse
        </h2>
        <p className="text-[2vw] md:text-[16px] leading-[3vh] text-center font-semibold">
          By using TradeVerse, you agree to our terms of service and privacy
          policy.
        </p>
        <Button title="Accept and Continue" isLink link="/onboarding/Auth"  />
      </div>
    </div>
  );
};

export default Onboard;