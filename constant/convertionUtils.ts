import { fetchCryptoPrice } from './cryptoApi';
import { formatEthValue } from './formattingUtils';

export async function convertToEthereum(dollarAmount: any, cryptoId: string, vsCurrency: string): Promise<string> {
  try {
    const ethConversionRate = await fetchCryptoPrice(cryptoId, vsCurrency);
    const ethereumAmount = dollarAmount / ethConversionRate;
    return formatEthValue(ethereumAmount, 4);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
