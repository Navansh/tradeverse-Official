import { Mainbody, Navbar, Sidebar } from "@/components";
import React from "react";

const home = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen overflow-hidden w-screen">
        <Sidebar />
        <div className="overflow-y-auto overflow-hidden">
          <Mainbody />
        </div>
      </div>
    </>
  );
};

export default home;
