import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { TransactionData } from "../models/TransactionData";
import {
  GridColDef,
  //  GridValueGetterParams
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const columns: GridColDef[] = [
  { field: "hash", headerName: "Tx Hash", width: 200 },
  { field: "from", headerName: "From", width: 130 },
  { field: "to", headerName: "To", width: 130 },
  {
    field: "timestamp",
    headerName: "Date",
    type: "string",
    width: 180,
  },
  {
    field: "value",
    headerName: "Eth Transferred",
    type: "number",
    width: 150,
  },
  {
    field: "networkName",
    headerName: "Network",
    type: "string",
    width: 100,
  },
];

interface InputFieldProps {
  tableData: TransactionData[];
}
const TransactionsTable = ({ tableData }: InputFieldProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pageSize, setPageSize] = useState<number>(5);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState<number[]>([]);
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };
  const [txHash, setTxHash] = useState<any>();
  const [domain, setDomain] = useState<any>();

  useEffect(() => {
    //change rows per page based on table data length
    setRowsPerPageOptions([5, 25, 50, 100, 250, 500]);
  }, []);

  const navigate = (): void => {
    window.open(`https://${domain}/tx/${txHash}`, "_blank");
  };

  const navigatePrompt = (params: any): void => {
    handleOpen();
    setTxHash(params.row.id);
    setDomain(params.row.network.explorerDomain);
  };

  const proceed = (): void => {
    navigate();
    handleClose();
  };

  const dontProceed = (): void => {
    handleClose();
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="transactions-table">
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageSizeChange={handlePageSizeChange}
        onRowClick={(params) => {
          navigatePrompt(params);
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            View transaction in block explorer?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Navigating to {`https://${domain}`}.
          </Typography>
          <div>
            <Button
              onClick={() => {
                proceed();
              }}
              style={{ float: "right" }}
            >
              Proceed
            </Button>
            <Button
              onClick={() => {
                dontProceed();
              }}
              style={{ float: "right" }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TransactionsTable;
