export function formatEthValue(ethValue: any, decimalPlaces: number): string {
    const formattedValue = parseFloat(ethValue).toFixed(decimalPlaces);
    return formattedValue;
  }
  