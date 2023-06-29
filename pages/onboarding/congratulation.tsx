import { logo } from "@/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const Congratulation = () => {
  const { width, height } = useWindowSize();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Confetti width={width} height={height} />
      <div className="min-w-[800px] min-h-[440px]  bg-[#253343] flex flex-col items-center justify-center px-[130px] py-[54.33px] rounded-[40px] space-y-[16px]">
        <Image
          src={logo}
          alt="logo"
          className="w-[80px] h-[61px] object-contain"
        />
        <h2 className="text-[4vw] md:text-[30px] text-center w-full leading-[6vh] font-semibold">
          Congratulations, You’re in
        </h2>
        <p className="text-[2vw] md:text-[16px] leading-[3vh] w-[22.5rem] text-center font-semibold">
          You`re all set to explore our marketplace! Your store is now set up,
          and your wallet is connected
        </p>
        <Button title="Explore Marketplace" isLink link="/dashboard/feed" />
      </div>
    </div>
  );
};

export default Congratulation;
