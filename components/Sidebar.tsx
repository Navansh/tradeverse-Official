import { Categories, Filter, Price, Tab } from "@/constant";
import React, { useState } from "react";
import Button from "./Button";
import FormField from "./FormField";
import { useRouter } from "next/router";
import Link from "next/link";

const Sidebar = () => {
  const [active, setActive] = useState("feed");
  

  const router = useRouter();
  return (
    <div className="w-[22%] h-screen bg-Bar pb-12 overflow-y-scroll scrollbar hidden lg:flex flex-col items-center scrollbar-track-transparent scrollbar-thumb-Foundation">
      <div className="px-6 flex flex-col items-start py-6 space-y-9 mt-5">
        {Tab.map((item, i) => (
          <Link key={i} href={item.route}>
            <div
              onClick={() => {
                setActive(item.active);
              }}
              className="flex cursor-pointer items-center space-x-3"
            >
              <div
                className={`${
                  active === item.active
                    ? "bg-green p-3 rounded-full text-[#ffffff]"
                    : "bg-slate-400/30 p-3 rounded-full"
                } text-white`}
              >
                <item.icon size={25} />
              </div>
              <span
                className={`${
                  active === item.active ? "text-[#fff]" : "text-Foundation"
                } text-[18px] font-bold`}
              >
                {item.title}
              </span>
            </div>
          </Link>
        ))}
        <div className="flex flex-col space-y-4 items-center">
          <Button title="Create new listing" isLink link="/dashboard/newListing"/>
          <Button title="Start a live call" isBorder={true} isLink link="/dashboard/goLive" />
        </div>
      </div>

      <div className="border-b-2 border-[#fff] pb-6 w-full" />

      {/** filter */}
      <div className="flex flex-col items-start space-y-3 w-full px-6 mt-4">
        <span className="text-[24px] font-bold">Filter</span>
        <FormField title="" isCategory isHidden item={Filter} />
        <FormField title="" isCategory isHidden item={Price} />
      </div>

      <div className="border-b-2 border-[#fff] pb-6 w-full" />

      <div className="flex flex-col cursor-pointer items-start space-y-3 mb-9 w-full px-6 mt-4">
        <span className="text-[24px] font-bold">Categories</span>
        <div className="flex flex-col items-start space-y-6">
          {Categories.map((item, i) => (
            <div key={i} className="flex items-start space-x-3">
              <item.icon size={25} />
              <span className="text-Foundation text-[16px]">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
