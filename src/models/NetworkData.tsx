type NetworkShortName = "ETH" | "Matic" | "BSC"
type NetworkName = "Ethereum" | "Polygon" | "Binance Smart Chain";
type NetworkDomain = "etherscan.io" | "bscscan.com" | "polygonscan.com";


export interface NetworkData {
  name: NetworkName;
  shortName: NetworkShortName;
  explorerDomain: NetworkDomain;
  apiKey: string | undefined;
}