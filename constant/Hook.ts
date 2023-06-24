import axios from "axios";

// Fetch the Celo price in USD
export const fetchCeloPrice = async (): Promise<number> => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=celo&vs_currencies=usd"
    );

    const celoPriceUSD = response.data.celo.usd;
    return celoPriceUSD;
  } catch (error) {
    console.error("Failed to fetch Celo price:", error);
    return 0;
  }
};

// Convert dollar amount to Ethereum
export const convertToEthereum = async (
  dollarAmount: number
): Promise<number> => {
  try {
    const celoPriceUSD = await fetchCeloPrice();
    const ethereumAmount = dollarAmount / celoPriceUSD;
    return ethereumAmount;
  } catch (error) {
    console.error("Error converting to Ethereum:", error);
    return 0;
  }
};

export const handleConversion = async (dollarAmount: number) => {
  try {
    const celoPriceUSD = await fetchCeloPrice();
    const ethereumAmount = await convertToEthereum(dollarAmount);

    console.log("Celo price in USD:", celoPriceUSD);
    console.log("Ethereum amount:", ethereumAmount);

    return ethereumAmount;

    // Continue with the rest of your logic...
  } catch (error) {
    console.error("Error:", error);
  }
};
