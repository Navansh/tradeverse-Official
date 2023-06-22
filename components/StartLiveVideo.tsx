import { video } from "@/assets";
import Image from "next/image";
import React from "react";
import Button from "./Button";
import vector from "../assets/vector-1.png";
import { useTradeContext } from "@/context";
import { useRouter } from "next/router";

const StartLiveVideo = () => {
  const { getRoomId } = useTradeContext();
  const router = useRouter();

  const goLive = async () => {
    const roomId = await getRoomId();
    if (roomId) {
      router.push(`/meet/${roomId}`);
    }
  };
  return (
    <div className="max-w-[776px] max-h-[796px] bg-Gray/900 rounded-[8px] px-[208px] py-[66px] space-y-16 flex-shrink-0 flex flex-col item-center justify-center">
      <div className="flex flex-col items-center space-x-[16px]">
        <div className="flex w-[80px]  h-[80px] p-[20px] items-center justify-center flex-shrink-0 rounded-[80px] bg-white/25">
          <Image
            src={video}
            alt="live"
            className="w-[40px] h-[40px] flex-shrink-0 object-contain"
          />
        </div>
        <h1 className="text-[24px] pt-6 font-semibold leading-[40px] tracking-[-0.24px]">
          Go live
        </h1>
        <p className="flex pb-6 pt-3 flex-col items-center text-center text-[16px] leading-[24px]">
          Go live to showcase your products and <br /> communicate with your
          customers
        </p>
        <Button title="Go Live" isFunc handleClick={goLive} />
      </div>

      <div className="flex items-center space-x-4 justify-center ">
        <Image src={vector} alt="vector" className="h-1 w-[320px]" />
        <span>or</span>
        <Image src={vector} alt="vector" className="h-1 w-[320px]" />
      </div>

      <div className="flex flex-col  items-center space-x-[16px]">
        <div className="flex w-[80px] h-[80px] p-[20px] items-center justify-center flex-shrink-0 rounded-[80px] bg-white/25">
          <Image
            src={video}
            alt="live"
            className="w-[40px] h-[40px] flex-shrink-0 object-contain"
          />
        </div>
        <h1 className="text-[24px] pt-6 font-semibold leading-[40px] tracking-[-0.24px]">
          Schedule Live chat
        </h1>
        <p className="flex  flex-col pb-6 pt-6 items-center text-center text-[16px] leading-[24px]">
          Create an event ahead of time. <br /> You and your viewers will get a
          reminder before you go live.
        </p>
        <Button title="Go Live" isFunc isBorder />
      </div>
    </div>
  );
};

export default StartLiveVideo;
