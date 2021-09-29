import { useEffect, useState } from "react";
import { DataGrid, GridToolbar as MuiGridToolbar, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbar } from "@mui/x-data-grid"
import { mockData } from "./mockData";
import { styled } from '@mui/material/styles';
import { DateRangePicker } from "materialui-daterange-picker";
import DateRangeIcon from "@material-ui/icons/DateRange";
import IconButton from '@mui/material/IconButton';

import { useDispatch, useSelector } from "react-redux";

export const Export = () => {
  const dispatch = useDispatch();
  const style = useSelector((state) => state.style);
  const latestData = useSelector((state) => state.data.latestData);
  useEffect(() => { }, [dispatch, style]);

  const [open, setOpen] = useState(false);
  let startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);
  // console.log(startDate);
  const [dateRange, setDateRange] = useState({
    startDate: startDate,
    endDate: new Date()
  });

  const GridToolbar = styled(MuiGridToolbar)(
    ({ theme }) => ({
      '& .MuiButton-textPrimary': {
        color: style.secondaryColor
      }
    })
  );

  const CustomizedGridToolbar = () => {
    return (
      <div>
        <GridToolbarContainer>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div>
              From <b>{dateToString(dateRange.startDate)}</b> to <b>{dateToString(dateRange.endDate)}</b>
            </div>
            <div>
              <IconButton aria-label="Pick date range" onClick={toggle}>
                <DateRangeIcon />
              </IconButton>
            </div>
            <div>
              <GridToolbar />
            </div>
          </div>
        </GridToolbarContainer>
        <div className="date-range-picker">
          <DateRangePicker
            open={open}
            toggle={toggle}
            onChange={(range) => setDateRange(range)}
            wrapperClassName="date-range-picker"
          />
        </div>
      </div>
    );
  }

  const dateToString = date => `${date.toLocaleDateString()} ${date.toLocaleTimeString().split(' ')[0]}`

  const columns = [
    {
      field: 'measuredAt', headerName: 'Measured At', minWidth: 200, type: "date",
      valueGetter: params => new Date(Date.parse(params.value)),
      valueFormatter: params => dateToString(params.value)
    },
    { field: 'buoyId', headerName: 'Buoy', type: 'number', minWidth: 110 },
    {
      field: 'location', headerName: 'Location', minWidth: 200, filterable: false, sortable: false,
      valueGetter: params => `${params.getValue(params.id, 'longitude').toFixed(6)}, ${params.getValue(params.id, 'latitude').toFixed(6)}`
    },
    { field: 'sensor', headerName: 'Sensor', minWidth: 130, valueFormatter: params => "TODO" },
    { field: 'value', headerName: 'Value', type: 'number', minWidth: 120 }
  ];

  const data = null;

  useEffect(() => {
    if (latestData) {
      console.log(latestData);
      data = latestData.reduce((prev, curr) => prev.concat(getMeasurementData(curr)), []);
    }
  }, [dispatch, latestData])

  const toggle = () => setOpen(!open);

  if (data) {
    return (<div style={{ height: 560, width: '100%', padding: 20, paddingTop:20, boxSizing: "border-box"}}>
      <DataGrid rows={data} columns={columns} components={{
        Toolbar: CustomizedGridToolbar
      }} onFilterModelChange={e => console.log(e)}
        filterModel={{
          items: [
            { id: '1', columnField: 'measuredAt', operatorValue: 'onOrBefore', value: `${dateRange.startDate.getFullYear()}-${dateRange.startDate.getMonth()}-${dateRange.startDate.getDate()}` },
            // { id: '2', columnField: 'measuredAt', operatorValue: 'onOrBefore', value: `${dateRange.startDate.getFullYear()}-${dateRange.startDate.getMonth()}-${dateRange.startDate.getDate()}` }
          ]
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