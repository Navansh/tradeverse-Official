import { ellipse } from "@/assets";
import { sellingPoint } from "@/constant";
import Image from "next/image";
import React from "react";

const SellingPoint = () => {
  return (
    <section className="mt-[80px] items-start lg:pl-[80px] w-full bg-hero-pattern3 object-cover bg-center">
      <h1 className="text-[40px] font-bold leading-[46px]">
        Unique Selling Points and Benefits
      </h1>
      <p className="text-[16px] leading-[24px] font-normal w-[800px] mt-[16px]">
        Welcome to TradeVerse, the decentralized marketplace that revolutionizes
        the way buyers and sellers connect. Our platform offers a range of
        unique selling points and benefits that set us apart.
      </p>

      <div className="flex flex-wrap gap-20 mt-9 items-center">
        {sellingPoint.map((item) => (
          <div
            key={item.title}
            className="border-2 border-Bar px-12 item-center w-[400px] h-[400px]"
          >
            <Image
              src={ellipse}
              alt={item.title}
              className="w-[40px] h-[40px] mt-[40px] object-cover"
            />
            <h1 className="text-[24px] leading-[28px] font-bold mt-[40px]">
              {item.title}
            </h1>
            <p className="text-[16px] leading-[24px] font-normal mt-[40px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SellingPoint;
