require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",

  networks: {
    mumbai: {
      url: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 80001,
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
