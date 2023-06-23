import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Button,
  Contact,
  Feature,
  Footer,
  HowItWorks,
  MainNav,
  MissionStatement,
  SellingPoint,
} from "@/components";
import { useTradeContext } from "@/context";
import { useEffect } from "react";
import { Mode, WALLET } from "@dataverse/runtime-connector";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  return (
    <div className="overflow-y-scroll h-screen overflow-hidden">
      <div className="bg-hero-pattern border-b-4 border-[#fff]  object-cover bg-cover bg-top  bg-no-repeat !w-screen h-[880px] h-creen">
        <MainNav />
        <div>
          <div className="flex flex-col mt-[320px] items-start w-full pl-[80px]">
            <h1 className="text-[48px] font-normal text-[#fff] leading-[56.25px]">
              Future of E-commerce: <br />
              <span className="font-black">Connect, Engage, and Transact</span>
            </h1>
            <p className="text-[18px] font-normal leadin-[24px] max-w-[669px] h-[72px] mt-[16px] mb-[40px] tracking-wider">
              Step into a decentralized marketplace where possibilities come
              alive. Create your own store, showcase your products in real-time
              live sessions, and engage directly with buyers through interactive
              Q&A sessions.
            </p>
            <Button title="Get Started" isLink link="/onboarding/onboard" />
          </div>
        </div>
      </div>
      <div className="bg-hero-pattern2 bg-black bg-cover py-16 bg-center">
        <MissionStatement />
        <SellingPoint />
      </div>
      <div className="mt-[80px] flex flex-col item-center w-full py-[30px]">
        <Feature />
      </div>
      <div className={`bg-hero-pattern2 bg-black bg-cover py-16 bg-center ${`bg-hero-pattern3 bg-cover bg-center`}`}>
        <HowItWorks />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
