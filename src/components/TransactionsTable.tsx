import {
  DataGrid
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { TransactionData } from "../models/TransactionData";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

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
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];


interface InputFieldProps {
  tableData: TransactionData[];
}
const TransactionsTable = ({ tableData }: InputFieldProps) => {
  const [pageSize, setPageSize] = useState<number>(5);
  const [rowsPerPageOptions, setRowsPerPageOptions] = useState<number[]>([]);
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  useEffect(() => {
    //change rows per page based on table data length
    setRowsPerPageOptions([5, 25, 50, 100, 250, 500]);
  }, []);

  const navigate = (txHash:string):void => {
    window.open(`https://etherscan.io/tx/${txHash}`,"_blank");
  }

  return (
    <div className="transactions-table">
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageSizeChange={handlePageSizeChange}
        onCellDoubleClick={(params) => {
          navigate(String(params.id))
        }}
        
      />
    </div>
  );
};


export default TransactionsTable;
