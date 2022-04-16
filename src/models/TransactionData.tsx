import { NetworkData } from "./NetworkData";

type NetworkShortName = "ETH" | "Matic" | "BSC";


export interface TransactionData {
  id: string;
  hash: string;
  timestamp: string;
  value: number;
  network: NetworkData;
  networkName: NetworkShortName;
  from: string;
  to: string;
}