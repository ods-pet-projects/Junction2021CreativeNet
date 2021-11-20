import * as React from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";
import axios from "axios";

// axios
//   .get("http://51.250.17.189:25000/api/get_queries")
//   .then((res) => console.log(res));

const columns = [
  { field: "id", headerName: "ID", width: 120 },
  {
    field: "probability",
    headerName: "Probability",
    editable: true,
  },
  {
    field: "action_type",
    headerName: "Actions",
    editable: true,
  },
  {
    field: "sensor_quality",
    headerName: "Sensor quality",
    editable: true,
  },
  {
    field: "loading",
    headerName: "Loading",
    editable: true,
  },
  {
    field: "area_id",
    headerName: "Area",
    editable: true,
  },
  {
    field: "speed",
    headerName: "Speed",
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "check" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}>Click</Button>;
    },
  },
];

const rows = [
  {
    id: "ele0003323",
    probability: "0.87",
    action_type: "arc03",
    sensor_quality: "0.90",
    loading: "high",
    area_id: "ga0000803",
    speed: "high",
  },
  {
    id: "ele0003467",
    probability: "0.90",
    action_type: "arc02",
    sensor_quality: "0.80",
    loading: "middle",
    area_id: "ga0000803",
    speed: "high",
  },
  {
    id: "ele0003395",
    probability: "0.76",
    action_type: "arc01",
    sensor_quality: "0.67",
    loading: "middle",
    area_id: "ga0000803",
    speed: "middle",
  },
];

export default function Table() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
        autoPageSize
      />
    </div>
  );
}
