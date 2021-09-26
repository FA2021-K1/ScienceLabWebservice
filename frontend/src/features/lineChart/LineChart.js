import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getDataAverageByDay } from "../../dataSlice";
import { optionsConfig } from "./lineChartConfig";

import { useDispatch, useSelector } from "react-redux";

export const LineChart = () => {
  const dispatch = useDispatch();
  const style = useSelector((state) => state.style);
  const selectedTime = useSelector((state) => state.data.selectedTime);
  const data = useSelector((state) => state.data.dataAverageByDay);
  const dataState = useSelector((state) => state.data.dataAverageByDayState);
  const selectedData = useSelector((state) => state.data.selectedData);

  const [series, setSeries] = useState([
    {
      name: "Buoy2",
      data: [
        [1532396593, 0],
        [1532397593, 1],
        [1532398593, 2],
        [1532399593, 3],
        [1532400593, 4],
        [1532401593, 5],
        [1532402593, 6],
        [1532403593, 7],
        [1532404593, 8],
      ],
    },
    {
      name: "Buoy1",
      data: [
        [1532396593, 10],
        [1532397593, 9],
        [1532398593, 8],
        [1532399593, 7],
        [1532400593, 6],
        [1532401593, 5],
        [1532402593, 4],
        [1532403593, 3],
        [1532404593, 2],
      ],
    },
  ]);

  const [options, setOptions] = useState(optionsConfig(style));
  
  useEffect(() => {
    // Load when the Sides first loads
    if (dataState === "idle") {
      dispatch(getDataAverageByDay({ selectedTime, selectedData: "TDS" }));
      // TODO: Make selected Data dependet of the selected Value
    }
  }, [dataState]);

  useEffect(() => {
    // Change Series to refresh chart data as soon as the data changes
    if (data) {
      //setSeries(data)
      // TODO: Wait for backend to finish their shit
    }
  }, [data]);

  useEffect(() => {
    // When the selected Time Changes and there is already Data: Load new Data
    if (data) {
      dispatch(getDataAverageByDay({ selectedTime, selectedData }));
    }
  }, [selectedTime, selectedData]);

  useEffect(() => {

    if(selectedData === "pH"){
      setOptions({...options, colors: style.pHShades, 
        title: {text: "Means per day of last 7 days - "+ selectedData},
        yaxis: {
          title: {
              text: "[-]",
          },
          min: 0,
          max: 14,
      }})
    }else if(selectedData === "TDS"){
      setOptions({...options, colors: style.TDSShades,
        title: {text: "Means per day of last 7 days - "+ selectedData},
        yaxis: {
          title: {
              text: "[ppm]",
          },
          min: 100,
          max: 1000,
      }})

    }
  }, [selectedData]);

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={"350"} />
    </div>
  );
};
