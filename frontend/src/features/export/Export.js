import { useEffect, useState } from "react";
import { DataGrid, GridToolbar as MuiGridToolbar, GridToolbarContainer } from "@mui/x-data-grid"
import { styled } from '@mui/material/styles';
import { DateRangePicker } from "materialui-daterange-picker";
import DateRangeIcon from "@material-ui/icons/DateRange";
import IconButton from '@mui/material/IconButton';

import { useDispatch, useSelector } from "react-redux";

import { getData, getSensorTypes } from "../../dataSlice";

export const Export = () => {
  const dispatch = useDispatch();
  const style = useSelector((state) => state.style);
  const data = useSelector((state) => state.data.data);
  const dataState = useSelector((state) => state.data.dataState);
  const sensorTypes = useSelector((state) => state.data.sensorTypes);
  const sensorTypesState = useSelector((state) => state.data.sensorTypesState);
  useEffect(() => { }, [dispatch, style]);

  const [open, setOpen] = useState(false);
  let startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  let endDate = new Date();
  endDate.setHours(23, 59, 59, 0);
  const [dateRange, setDateRange] = useState({
    startDate: startDate,
    endDate: endDate
  });

  const GridToolbar = styled(MuiGridToolbar)(
    ({ theme }) => ({
      '& .MuiButton-textPrimary': {
        color: style.secondaryColor
      },
      '& .MuiBadge-colorPrimary': {
        backgroundColor: style.secondaryColor
      }
    })
  );

  const CustomizedGridToolbar = () => {
    return (
      <div>
        <GridToolbarContainer>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>
            <div>
              Selected date range: <b>{dateRange.startDate.toLocaleDateString()}</b> to <b>{dateRange.endDate.toLocaleDateString()}</b>
            </div>
            <div style={{ flexGrow: 1 }}>
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
            onChange={(range) => {
              toggle();
              range.startDate.setHours(0, 0, 0, 0);
              range.endDate.setHours(23, 59, 59, 0);
              setDateRange({
                startDate: range.startDate,
                endDate: range.endDate
              });
              const startDate = range.startDate.getTime();
              const endDate = range.endDate.getTime();
              dispatch(getData({ startDate, endDate }));
            }}
            wrapperClassName="date-range-picker"
          />
        </div>
      </div>
    );
  }

  const columns = [
    {
      field: 'date', headerName: 'Measured At', minWidth: 200,
      valueGetter: params => new Date(Date.parse(params.value)),
      valueFormatter: params => {
        let hours = params.value.getHours();
        let hoursStr = hours < 10 ? `0${hours}` : hours.toString();
        let mins = params.value.getMinutes();
        let minsStr = mins < 10 ? `0${mins}` : mins.toString();
        return `${params.value.toLocaleDateString()} ${hoursStr}:${minsStr}`;
      }, filterable: false
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
    {
      field: 'sensorTypeID', headerName: 'Sensor', minWidth: 130,
      valueGetter: params => sensorTypes.find(sensorType => sensorType.id === params.value).name
    },
    { field: 'value', headerName: 'Value', type: 'number', minWidth: 120 },
    {
      field: 'unit', headerName: 'Unit', minWidth: 130, filterable: false, sortable: false,
      valueGetter: params => sensorTypes.find(sensorType => sensorType.id === params.row.sensorTypeID).unit
    }
  ];

  useEffect(() => {
    if (dataState === "idle") {
      const startDate = dateRange.startDate.getTime();
      const endDate = dateRange.endDate.getTime();
      dispatch(getData({ startDate, endDate }));
    }
    if (sensorTypesState === "idle") {
      dispatch(getSensorTypes());
    }
  }, [dispatch, dataState, sensorTypesState, data])

  const toggle = () => setOpen(!open);

  if (sensorTypes && data) {
    return (<div style={{ height: 560, width: '100%', padding: 20, paddingTop: 20, boxSizing: "border-box" }}>
      <DataGrid rows={data} columns={columns} components={{
        Toolbar: CustomizedGridToolbar
      }} loading={dataState !== "loaded"} disableSelectionOnClick={true}/>
    </div>);
  }
  return (<div>Waiting for data ...</div>)
}