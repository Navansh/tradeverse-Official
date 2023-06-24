import axios from "axios";
import { ethers } from "ethers";

export async function fetchCryptoPrice(
  cryptoId: string,
  vsCurrency: string
): Promise<number> {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=${vsCurrency}`
    );
    const priceData =
      response.data[cryptoId.toLowerCase()][vsCurrency.toLowerCase()];
    return priceData;
  } catch (error) {
    console.error("Failed to fetch cryptocurrency price:", error);
    throw error;
  }
}

// Function to fetch the current gas price
async function getGasPrice(): Promise<ethers.BigNumber> {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the current gas price
    const gasPrice = await provider.getGasPrice();

    return gasPrice;
  } catch (error) {
    console.error("Error fetching gas price:", error);
    throw error;
  }
}

// Function to calculate the transaction fee
function calculateTransactionFee(
  price: number,
  gasPrice: ethers.BigNumber,
  gasLimit: number
): string {
  const fee = ethers.utils.formatUnits(gasPrice.mul(gasLimit), "gwei");
  const totalFee = price + parseFloat(fee);

  return totalFee.toFixed(2);
}

function formatCurrency(amount: number | null, currencyCode: string): number | null {
  if (amount === null) {
    return null; // Return null for null values
  }

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).formatToParts(amount);

  const numericValue = Number(formattedAmount.filter(part => part.type === "integer" || part.type === "decimal").map(part => part.value).join(''));

  return numericValue;
}


export { getGasPrice, calculateTransactionFee, formatCurrency };
