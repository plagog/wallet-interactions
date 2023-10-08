import { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import WalletsForm from "./components/WalletsForm";
import { TransactionData } from "./models/TransactionData";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { NetworkData } from "./models/NetworkData";
import { Analytics } from "@vercel/analytics/react";
import "./styles/App.scss";

const networks: NetworkData[] = [
  {
    name: "Ethereum",
    shortName: "ETH",
    explorerDomain: "etherscan.io",
    apiKey: process.env.REACT_APP_ETHERSCAN_API_KEY,
  },
  {
    name: "Binance Smart Chain",
    shortName: "BSC",
    explorerDomain: "bscscan.com",
    apiKey: process.env.REACT_APP_BSCSCAN_API_KEY,
  },
  {
    name: "Polygon",
    shortName: "Matic",
    explorerDomain: "polygonscan.com",
    apiKey: process.env.REACT_APP_POLYGONSCAN_API_KEY,
  },
];

function App() {
  const [tableData, setTableData] = useState<TransactionData[] | null>(null);
  const [network, setNetwork] = useState<NetworkData>(networks[0]);

  const handleChange = (event: SelectChangeEvent) => {
    let tempNetwork: NetworkData | undefined = networks.find((el) => {
      return el.name === event.target.value;
    });
    setNetwork(tempNetwork as NetworkData);
  };

  return (
    <>
      <div className="App">
        <div className="header">
          <h1>Wallet Transaction Explorer</h1>
          <h2>Explore transactions between 2 ethereum wallets</h2>
        </div>
        <div className="main">
          <div className="selector-parent-div">
            <div className="selector-div">
              <Box>
                <FormControl>
                  <InputLabel id="select-label">Network</InputLabel>
                  <Select
                    labelId="select-label"
                    className="network-selector"
                    onChange={handleChange}
                    value={network.name}
                    label="Network"
                  >
                    {networks.map((network) => {
                      return (
                        <MenuItem
                          key={network.shortName}
                          style={{ fontFamily: "Anybody" }}
                          value={network.name}
                        >
                          {network.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="dummyDiv"></div>
          </div>

          <WalletsForm setTableData={setTableData} network={network} />
          {tableData && <TransactionsTable tableData={tableData} />}
        </div>
      </div>
      <Analytics />
    </>
  );
}

export default App;
