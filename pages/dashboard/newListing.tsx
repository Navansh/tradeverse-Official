import { Navbar, ProductForm, Sidebar } from "@/components";
import React from "react";

const Upload = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-start h-screen">
        <Sidebar />
        <ProductForm />
      </div>
    </>
  );
};

export default Upload;
