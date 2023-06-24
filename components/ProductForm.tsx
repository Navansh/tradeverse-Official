import React, { useState, useCallback } from "react";
import FormField from "./FormField";
import Button from "./Button";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import close from "../assets/mingcute-close-fill.png";
import Image from "next/image";
import { useContractContext } from "@/context/ContractProvider";
import { ethers } from "ethers";
import { useDropzone } from "react-dropzone";
import { camera } from "@/assets";

const styles = {
  wrapper: "mt-[10%] flex flex-col space-y-8",
};

import { sendFileToIPFS } from "@/constant/pinata";
import { category } from "@/constant";

const ProductForm = () => {
  const router = useRouter();

  // State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [categories, setCategory] = useState("");
  const [availability, setAvailability] = useState(0);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<string[]>([]);
  const { addProduct } = useContractContext();
  const [refundTime, setRefundTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const ipfsHash = await sendFileToIPFS(file);
        return ipfsHash;
      });
      setIsLoading(true);
      const hashes = await Promise.all(uploadPromises);
      console.log(hashes);
      setImage(hashes);
      setIsLoading(false);
    } catch (error) {
      // Handle error uploading files
      console.error("Error uploading files:", error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
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

  const handleRefundChange = (e: any) => {
    setRefundTime(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addProduct(
      title,
      categories,
      image,
      description,
      price,
      location,
      availability,
      refundTime
    );
  };

  return (
    <div className="h-screen overflow-auto py-[80px] scrollbar-hide">
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
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-wrap  items-start gap-12"
        >
          <div
            {...getRootProps()}
            className="min-w-[543px] h-[522px] border-Bar border-2 px-6 py-3.5 flex items-center justify-center"
          >
            <div className="flex flex-col space-y-9 items-center justif-center w-full">
              <div className="bg-white/30 w-[80px] h-[80px] flex items-center justify-center rounded-full ">
                <Image
                  src={camera}
                  alt="upload"
                  className="w-[40px] h-[32px] object-cover"
                />
              </div>
              <div>
                <h1 className="text-[24px] leading-[29.13px] font-bold">
                  {isLoading ? "Loading...." : "Add Photos/Videos"}
                </h1>
                <input {...getInputProps({ multiple: true })} />
                <span className="text-[14px] leading-[24px] font-normal">
                  or drag and drop from your device
                </span>
              </div>
            </div>
          </div>

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
                type="number"
                isInput
                handleChange={handlePriceChange}
              />
              <span className="text-[14px] leading-[24px] text-center text-green">
                Enter price in dollar not decimals
              </span>
              <FormField
                title="What do you want to sell *"
                type="select"
                isCategory
                item={category}
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
              <FormField
                title="Shipping Fee"
                type="number"
                isInput
                handleChange={handleRefundChange}
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
