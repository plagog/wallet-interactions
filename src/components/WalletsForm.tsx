import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { ethers, utils } from "ethers";
import { WalletFormData } from "../models/WalletFormData";
import { TransactionData } from "../models/TransactionData";
import { NetworkData } from "../models/NetworkData";

interface InputFieldProps {
  setTableData: any;
  network: NetworkData;
}

const WalletsForm = ({ setTableData, network }: InputFieldProps) => {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<WalletFormData>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<WalletFormData> = async (
    data: WalletFormData
  ) => {
    if (data.walletAddress1 === data.walletAddress2) return;
    console.log("heelo");
    setLoading(true);
    let history1: any[] = await getHistory(data.walletAddress1);
    let history2: any[] = await getHistory(data.walletAddress2);
    let array: TransactionData[] = processHistories(
      history1,
      data.walletAddress1,
      history2,
      data.walletAddress2
    );

    setTableData(array);
    setLoading(false);
  };

  const processHistories = (
    history1: any[],
    walletAddress1: string,
    history2: any[],
    walletAddress2: string
  ): TransactionData[] => {
    let map = new Map();
    history1.forEach((el) => {
      if (el.from === walletAddress2 || el.to === walletAddress2) {
        let toSet: TransactionData = {
          id: el.hash,
          hash: `${el.hash.substring(0, 10)}...${el.hash.substring(
            el.hash.length - 8
          )}`,
          from: `${el.from.substring(0, 6)}...${el.from.substring(
            el.from.length - 4
          )}`,
          to: `${el.to.substring(0, 6)}...${el.to.substring(el.to.length - 4)}`,
          timestamp: new Date(el.timestamp * 1000).toLocaleString("en-US"),
          value:
            Math.round(Number(utils.formatUnits(el.value, 18)) * 10000) / 10000,
        };
        map.set(el.hash, toSet);
      }
    });
    history2.forEach((el) => {
      console.log(el.timestamp);
      if (el.from === walletAddress1 || el.to === walletAddress1) {
        let toSet: TransactionData = {
          id: el.hash,
          hash: `${el.hash.substring(0, 10)}...${el.hash.substring(
            el.hash.length - 8
          )}`,
          from: `${el.from.substring(0, 6)}...${el.from.substring(
            el.from.length - 4
          )}`,
          to: `${el.to.substring(0, 6)}...${el.to.substring(el.to.length - 4)}`,
          timestamp: new Date(el.timestamp * 1000).toLocaleString("en-US"),
          value:
            Math.round(Number(utils.formatUnits(el.value, 18)) * 10000) / 10000,
        };
        map.set(el.hash, toSet);
      }
    });
    console.log(map);
    return Array.from(map.values());
  };

  const getHistory = async (address: string): Promise<any[]> => {
    let history: any[] = [];
    try {
      let provider = new ethers.providers.EtherscanProvider(
        "mainnet",
        process.env.REACT_APP_ETHERSCAN_API_KEY
      );
      history = await provider.getHistory(address);
    } catch (error) {
      setLoading(false);
    }
    return history;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="wallets-form">
      <div className="inputs">
        <div className="input-div">
          <label>Wallet Address 1</label>
          <input
            placeholder="0x"
            {...register("walletAddress1", {
              required: true,
              pattern: /^0x[a-fA-F0-9]{40}$/i,
            })}
          />

          {errors.walletAddress1 && <span>Invalid Address</span>}
        </div>

        <div className="input-div">
          <label>Wallet Address 2</label>
          <input
            placeholder="0x"
            {...register("walletAddress2", {
              required: true,
              pattern: /^0x[a-fA-F0-9]{40}$/i,
            })}
          />
          {errors.walletAddress2 && <span>Invalid Address</span>}
        </div>
      </div>
      <div className="button-div">
        <button type="submit" disabled={loading}>
          Search
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: "black",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </button>
      </div>
    </form>
  );
};

export default WalletsForm;
