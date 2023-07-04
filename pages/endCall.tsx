import { logo } from "@/assets";
import { Button, Navbar, Sidebar } from "@/components";
import { useStoreContext } from "@/context/StoreContext";
import { useDataverse } from "@/context/hooks/useDataverse";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const EndCall = () => {
  const { cancelStream } = useDataverse();
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <div className="flex items-start">
        <Sidebar />

        <div className="flex-1">
          <div className="min-h-screen flex items-center justify-center">
            <div className="min-w-[800px] min-h-[440px]  bg-[#253343] flex flex-col items-center justify-center px-[130px] py-[54.33px] rounded-[40px] space-y-[16px]">
              <Image
                src={logo}
                alt="logo"
                className="w-[80px] h-[61px] object-contain"
              />
              <h2 className="text-[4vw] md:text-[30px] text-center w-full leading-[6vh] font-semibold">
                Do you want to end the Live Call?
              </h2>
              <p className="text-[2vw] md:text-[16px] leading-[3vh] w-[22.5rem] text-center font-semibold">
                If you go off the call, your active status will automatically
                turn off, indicating that you`re currently unavailable.
              </p>
              <Button title="Process" isFunc handleClick={cancelStream} />
              <span
                onClick={() => router.back()}
                className="text-[14px] cursor-pointer font-normal text-center"
              >
                Go Back
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndCall;
