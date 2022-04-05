type NetworkShortName = "ETH" | "Matic" | "BSC"
type NetworkName = "Ethereum" | "Polygon" | "Binance Smart Chain";

export interface NetworkData {
  name: NetworkName;
  shortName: NetworkShortName;
}