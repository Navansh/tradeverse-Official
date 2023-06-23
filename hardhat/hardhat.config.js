require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",

  networks: {
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 44787,
    },
    // celo: {
    //   url: "https://forno.celo.org",
    //   accounts: {
    //     mnemonic: process.env.MNEMONIC,
    //     path: "m/44'/52752'/0'/0",
    //   },
    //   chainId: 42220,
    // },
  },
};
