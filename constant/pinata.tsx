import axios, { AxiosRequestConfig } from "axios";
import { pinata_apikey, pinata_secret, sendJsonHeader } from "./config";

export async function sendJSONToIPFS(metadata: any) {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const data = JSON.stringify({
    pinataMetadata: {
      name: "listdata",
    },
    pinataOptions: {
      cidVersion: 1,
    },
    pinataContent: {
      profileInfo: {
        metadataDetails: metadata,
      },
    },
  });
  const sendJson = await axios.post(url, data, sendJsonHeader);
  const hash = `ipfs://${sendJson.data.IpfsHash}`;
  return hash;
}

export async function sendDataToIPFS(metadata: any) {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  const data = JSON.stringify({
    pinataMetadata: {
      name: "listcontent",
    },
    pinataOptions: {
      cidVersion: 1,
    },
    pinataContent: {
      contentInfo: {
        content: metadata,
      },
    },
  });
  const sendJson = await axios.post(url, data, sendJsonHeader);
  const hash = `ipfs://${sendJson.data.IpfsHash}`;
  return hash;
}

export async function sendFileToIPFS(file: any) {
  const formData = new FormData() as FormData;
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  formData.append("file", file);
  const options: AxiosRequestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      pinata_api_key: pinata_apikey,
      pinata_secret_api_key: pinata_secret,
      Accept: "text/plain",
    },
    maxContentLength: Infinity,
  };
  const resFile = await axios.post(url, formData, options);
  return resFile.data.IpfsHash;
}