import { ParticleNetwork, WalletEntryPosition } from "@particle-network/auth";
import { ParticleProvider } from "@particle-network/provider";
import { ethers } from "ethers";

const particle = new ParticleNetwork({
  projectId: "a581fe1b-809a-40f9-a9e5-6ac8683695fc",
  clientKey: "ccyYA3EfVgH6LjvwxCbdi4E3qdkzjRmZR3t4c0Ot",
  appId: "9fcfcc9f-a1c7-41eb-afaa-939befdd3b33",
  chainName: "Celo", //optional: current chain name, default Ethereum.
  chainId: 44787, //optional: current chain id, default 1.
  wallet: {
    //optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
    displayWalletEntry: true, //show wallet entry when connect particle.
    defaultWalletEntryPosition: WalletEntryPosition.BL, //wallet entry position
    uiMode: "light", //optional: light or dark, if not set, the default is the same as web auth.
    supportChains: [
      { id: 1, name: "CeloTestnet" },
      { id: 5, name: "Celo" },
    ], // optional: web wallet support chains.
    customStyle: {}, //optional: custom wallet style
  },
});

const particleProvider = new ParticleProvider(particle.auth);

export default function connectWithContract(
  contractAddress: string,
  contractAbi: any
) {
  // Creating a new web3 provider with window.ethereum
  const provider = new ethers.providers.Web3Provider(particleProvider, "any");


  // Getting the signer
  const signer = provider.getSigner();

  // Creating a new contract factory with the signer, address and ABI
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);

  return contract;
}

export { connectWithContract };
