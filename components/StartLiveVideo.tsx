import { video } from "@/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import vector from "../assets/vector-1.png";
import { useTradeContext } from "@/context";
import { useRouter } from "next/router";
import { useHuddle01 } from "@huddle01/react";
import { useLobby } from "@huddle01/react/hooks";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useContractContext } from "@/context/ContractProvider";

const StartLiveVideo = () => {
  const { getRoomId } = useTradeContext();
  const [roomId, setRoomId] = useState("");
  const { initialize, isInitialized } = useHuddle01();
  
  const [isLoading, setIsLoading] = useState(false);
  const { joinLobby } = useLobby();
  const router = useRouter();
  console.log(roomId);

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize("6WUBy33h6jFb2RkYuwSfuZ5sOHKIZTgS");
    //console.log(roomId);
  }, []);

  const handleClick = async () => {
    try {
      const id = await getRoomId();
      setIsLoading(true);
      setRoomId(id);
      if (roomId) {
        setIsLoading(false);
        router.push(`/meet/${roomId}`);
      }
    } catch (error) {
      console.log(error);
      // Handle the error accordingly
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
        <Button
          title={`${isLoading ? "loading" : "Go Live"}`}
          isFunc
          handleClick={handleClick}
        />
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

export const getServerSideProps: GetServerSideProps<{
  roomId: string;
}> = async () => {
  const { data } = await axios.post(
    "https://api.huddle01.com/api/v1/create-room",
    {
      title: "Huddle01-SDK-Test",
      roomLock: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "2PCDD8nmkQavcrdx7GKf2DegWfpPYMnR",
      },
    }
  );

  return {
    props: {
      roomId: data.roomId,
    },
  };
};
