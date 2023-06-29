import { camera } from "@/assets";
import { sendFileToIPFS } from "@/constant/pinata";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setCoverImage: React.Dispatch<React.SetStateAction<string>>;
  coverImage: string;
}

const Email = ({ image, setImage, coverImage, setCoverImage }: Props) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const onProfileImageDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0]; // Get the first accepted file
      const ipfsHash = await sendFileToIPFS(file);
      setImage(ipfsHash);
      console.log(ipfsHash);
    } catch (error) {
      // Handle error uploading profile image
      console.error("Error uploading profile image:", error);
    }
  }, []);

  const onCoverImageDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0]; // Get the first accepted file
      const ipfsHash = await sendFileToIPFS(file);
      setCoverImage(ipfsHash);
      console.log(ipfsHash);
    } catch (error) {
      // Handle error uploading cover image
      console.error("Error uploading cover image:", error);
    }
  }, []);

  const profileImageDropzone = useDropzone({ onDrop: onProfileImageDrop });
  const coverImageDropzone = useDropzone({ onDrop: onCoverImageDrop });

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <div
          {...profileImageDropzone.getRootProps()}
          className="min-w-[543px] h-[222px] border-Bar border-2 px-6 py-3.5 flex items-center justify-center"
        >
          <div className="flex flex-col space-y-9 items-center justify-center w-full">
            <div className="bg-white/30 w-[80px] h-[80px] flex items-center justify-center rounded-full">
              <Image
                src={camera}
                alt="upload"
                className="w-[40px] h-[32px] object-cover"
              />
            </div>
            <div>
              <h1 className="text-[24px] leading-[29.13px] font-bold">
                Add Profile Photo
              </h1>
              <input {...profileImageDropzone.getInputProps()} />
              <span className="text-[14px] leading-[24px] font-normal">
                or drag and drop from your device
              </span>
            </div>
          </div>
        </div>

        <div
          {...coverImageDropzone.getRootProps()}
          className="min-w-[543px] h-[222px] border-Bar border-2 px-6 py-3.5 flex items-center justify-center"
        >
          <div className="flex flex-col space-y-9 items-center justify-center w-full">
            <div className="bg-white/30 w-[80px] h-[80px] flex items-center justify-center rounded-full">
              <Image
                src={camera}
                alt="upload"
                className="w-[40px] h-[32px] object-cover"
              />
            </div>
            <div>
              <progress />
              <h1 className="text-[24px] leading-[29.13px] font-bold">
                Add Cover Photo
              </h1>
              <span className="text-[14px] leading-[24px] font-normal">
                <input {...coverImageDropzone.getInputProps()} />
                or drag and drop from your device
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Email;
