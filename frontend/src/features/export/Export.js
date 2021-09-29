import { useEffect, useState } from "react";
import { DataGrid, GridToolbar as MuiGridToolbar, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbar } from "@mui/x-data-grid"
import { styled } from '@mui/material/styles';
// import { DateRangePicker } from "materialui-daterange-picker";
import DateRangeIcon from "@material-ui/icons/DateRange";
import IconButton from '@mui/material/IconButton';

import { useDispatch, useSelector } from "react-redux";

import { getLatestData } from "../../dataSlice";

export const Export = () => {
  const dispatch = useDispatch();
  const style = useSelector((state) => state.style);
  const latestDataUnformatted = useSelector((state) => state.data.latestDataUnformatted);
  const latestDataState = useSelector((state) => state.data.latestDataState);
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
            {/* <div>
              From <b>{dateToString(dateRange.startDate)}</b> to <b>{dateToString(dateRange.endDate)}</b>
            </div>
            <div>
              <IconButton aria-label="Pick date range" onClick={toggle}>
                <DateRangeIcon />
              </IconButton>
            </div> */}
            <div>
              <GridToolbar />
            </div>
          </div>
        </GridToolbarContainer>
        {/* <div className="date-range-picker">
          <DateRangePicker
            open={open}
            toggle={toggle}
            onChange={(range) => setDateRange(range)}
            wrapperClassName="date-range-picker"
          />
        </div> */}
      </div>
    );
  }

  const dateToString = date => `${date.toLocaleDateString()} ${date.toLocaleTimeString().split(' ')[0]}`

  const columns = [
    {
      field: 'date', headerName: 'Measured At', minWidth: 200,
      valueGetter: params => new Date(Date.parse(params.value)),
      valueFormatter: params => dateToString(params.value)
    },
    { field: 'buoyID', headerName: 'Buoy', type: 'number', minWidth: 110 },
    {
      field: 'location', headerName: 'Location', minWidth: 200, filterable: false, sortable: false,
      valueGetter: params => {
        const longitude = params.value.longitude.toFixed(6);
        const latitude = params.value.latitude.toFixed(6);
        return `${longitude} ${latitude}`;
      }
    },
    { field: 'sensorTypeID', headerName: 'Sensor', minWidth: 130 },
    { field: 'value', headerName: 'Value', type: 'number', minWidth: 120 }
  ];

  useEffect(() => {
    if (latestDataState === "idle") {
      const date = new Date();
      const selectedTime = date.getTime();
      dispatch(getLatestData({ selectedTime }));
    }
    if (latestDataUnformatted) {
      console.log(latestDataUnformatted);
    }
  }, [dispatch, latestDataUnformatted, latestDataState])

  const toggle = () => setOpen(!open);

  if (latestDataUnformatted) {
    return (<div style={{ height: 560, width: '100%', padding: 20, paddingTop:20, boxSizing: "border-box"}}>
      <DataGrid rows={latestDataUnformatted} columns={columns} components={{
        Toolbar: CustomizedGridToolbar
      }} />
    </div>);
  }
  return (<div>Waiting for data ...</div>)
}