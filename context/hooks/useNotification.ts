import { particleProvider } from "@/constant/contract";
import * as PushAPI from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { ethers } from "ethers";

export function useNotification() {
  // Creating a new web3 provider with window.ethereum
  const provider = new ethers.providers.Web3Provider(particleProvider, "any");

  // Getting the signer
  const signer = provider.getSigner();

  async function optInNotification() {
    const optin = await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: "eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681", // channel address in CAIP
      userAddress: "eip155:5:0x52f856A160733A860ae7DC98DC71061bE33A28b3", // user address in CAIP
      onSuccess: () => {
        console.log("opt in success");
      },
      onError: () => {
        console.error("opt in error");
      },
      env: ENV.STAGING,
    });
  }

  async function optOutNotification() {
    const optOut = await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: "eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681", // channel address in CAIP
      userAddress: "eip155:5:0x52f856A160733A860ae7DC98DC71061bE33A28b3", // user address in CAIP
      onSuccess: () => {
        console.log("opt in success");
      },
      onError: () => {
        console.error("opt in error");
      },
      env: ENV.STAGING,
    });
    return optOut;
  }

  return {
    optInNotification,
    optOutNotification
  }
}
