import React, { useState } from "react";
import FormField from "./FormField";
import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import close from "../assets/mingcute-close-fill.png";
import Image from "next/image";
import { useContractContext } from "@/context/ContractProvider";
import { ethers } from "ethers";

const styles = {
  wrapper: "mt-[10%] flex flex-col space-y-8",
};

const ProductForm = () => {
  const router = useRouter();

  // State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState(0);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("")
  const { addProduct } = useContractContext()
  const [refundTime, setRefundTime] = useState("")

  // Handle input changes
  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: any) => {
    setPrice(e.target.value);
  };

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
  };

  const handleAvailabilityChange = (e: any) => {
    setAvailability(e.target.value);
  };

  const handleLocationChange = (e: any) => {
    setLocation(e.target.value);
  };

  const handleSubmit  = (e: any) => {
    e.preventDefault()
    const amount = ethers.utils.parseEther("0.6")
    addProduct("ldldld", "lll", "dll", "dkldl" , amount,  "dkdk", 5, "jdj" )
  }

  return (
    <div className="h-screen overflow-auto scrollbar-hide">
      <div className="flex-1 m-6 items-start">
        <div
          onClick={() => router.back()}
          className="bg-white/25 cursor-pointer pr-[9px] pl-[10px] pt-[11px] pb-[10px] w-[40px] items-center rounded-[40px]"
        >
          <Image
            src={close}
            alt="close"
            className="w-[20px] h-[20px] object-contain"
          />
        </div>
        <form onSubmit={handleSubmit} action="" className="flex flex-wrap  items-start gap-12">
          <FormField title="" isImage />
          <div className="border-2 space-y-4 border-Bar w-[572px] min-h-[770px] px-6 py-12">
            <h2 className="text-[24px] font-bold leading-[28-13px]">
              Required
            </h2>
            <span className="mt-6">Be descriptive as possible</span>
            <div className="space-y-3">
              <FormField
                title="Title"
                type="text"
                isInput
                value={title}
                handleChange={handleTitleChange}
              />
              <FormField
                title="Description"
                type="text"
                isTextArea
                value={description}
                handleChange={handleDescriptionChange}
              />
              <FormField
                title="Price"
                type="text"
                isInput
                value={price}
                handleChange={handlePriceChange}
              />
              <FormField
                title="Category"
                type="text"
                isInput
                value={category}
                handleChange={handleCategoryChange}
              />
              <FormField
                title="Availability"
                type="number"
                isInput
                handleChange={handleAvailabilityChange}
              />
              <FormField
                title="Location"
                type="text"
                isInput
                value={location}
                handleChange={handleLocationChange}
              />
              <div className="flex w-full items-cente mt-7">
                <Button isFunc title="Continue" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
