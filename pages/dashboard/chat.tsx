import { Navbar, Sidebar } from "@/components";
import React from "react";

const chat = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen overflow-hidden w-screen">
        <Sidebar />
      </div>
    </>
  );
};

export default chat;
