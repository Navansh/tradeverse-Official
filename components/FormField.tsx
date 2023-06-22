import { camera } from "@/assets";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import React, { useCallback } from "react";

interface Props {
  title: string;
  type?: string;
  isInput?: boolean | null;
  isCategory?: boolean | null;
  item?: { title: string; value: string }[];
  isHidden?: boolean;
  isTextArea?: boolean;
  isImage?: boolean;
  value?: string;
  handleChange?: (e: any) => void;
}

const FormField = ({
  title,
  type,
  isInput,
  isCategory,
  item,
  isHidden,
  isTextArea,
  isImage,
  value,
  handleChange,
}: Props) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <label className="space-y-2 flex-col flex items-start" htmlFor="">
      <span className="text-[#00B86B] w-full text-[16px] leading-[24px] font-normal">
        {title}
      </span>
      {isInput && (
        <input
          value={value}
          type={type}
          onChange={handleChange}
          className="min-w-full border border-[#6783A0] outline-none placeholder:text-[#fff] text-[#fff] bg-Gray/900 px-4 py-2.5 rounded-[40px]"
        />
      )}

      {isTextArea && (
        <textarea
          rows={4}
          value={value}
          onChange={handleChange}
          className="min-w-full border border-[#6783A0] outline-none placeholder:text-[#fff] text-[#fff] bg-Gray/900 px-4 py-2.5 rounded-[8px]"
        />
      )}

      {isCategory && (
        <select
          onChange={handleChange}
          className={`${
            isHidden
              ? "border-none border text-Foundation "
              : " border border-[#6783A0] placeholder:text-[#7B93AF]   appearance-none relative "
          } min-w-full block outline-none  text-Foundation bg-Gray/900 px-4 py-2.5 rounded-[40px]`}
        >
          {item?.map((cate, i) => (
            <option
              className="bg-Gray/900 space-y-5 text-[#fff]"
              value={cate.value}
              key={i}
            >
              {cate.title}
            </option>
          ))}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </select>
      )}

      {isImage && (
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
                Add Photos/Videos
              </h1>
              <input {...getInputProps()} />
              <span className="text-[14px] leading-[24px] font-normal">
                or drag and drop from your device
              </span>
            </div>
          </div>
        </div>
      )}
    </label>
  );
};

export default FormField;
