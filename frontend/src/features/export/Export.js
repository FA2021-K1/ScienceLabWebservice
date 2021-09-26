import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { mockData } from "./mockData";

export const Export = () => {
  const columns = [
    {
      field: 'measuredAt', headerName: 'Measured At', minWidth: 180, type: "date",
      valueGetter: params => new Date(Date.parse(params.value)),
      valueFormatter: params => `${params.value.toLocaleDateString()} ${params.value.toTimeString().split(' ')[0]}`
    },
    { field: 'buoyId', headerName: 'Buoy', type: 'number', minWidth: 110 },
    {
      field: 'location', headerName: 'Location', minWidth: 200, filterable: false, sortable: false,
      valueGetter: params => `${params.getValue(params.id, 'longitude').toFixed(6)}, ${params.getValue(params.id, 'latitude').toFixed(6)}`
    },
    { field: 'sensor', headerName: 'Sensor', minWidth: 130, valueFormatter: params => "TODO" },
    { field: 'value', headerName: 'Value', type: 'number', minWidth: 120 }
  ];

  const jsonData = JSON.parse(mockData).data;
  // make flat table out of measurements
  const data = jsonData.reduce((prev, curr) => prev.concat(getMeasurementData(curr)), []);

  if (data) {
    return (<div style={{ height: 560, width: '100%', padding: 10, boxSizing: "border-box" }}>
      <DataGrid rows={data} columns={columns} components={{
        Toolbar: GridToolbar
      }} />
    </div>);
  }
  return (<div>Waiting for data ...</div>)
}

const getMeasurementData = measurement => {
  const measuredAt = measurement.measuredAt;
  const longitude = measurement.coordinate.longitude;
  const latitude = measurement.coordinate.latitude;
  const buoyId = measurement.buoyID;

  return measurement.measurementData.map(data => ({
      id: data.id,
      measuredAt: measuredAt,
      longitude: longitude,
      latitude: latitude,
      buoyId: buoyId,
      sensorId: data.sensor.id,
      value: data.value
  }));
}