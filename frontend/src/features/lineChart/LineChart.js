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

  const [series, setSeries] = useState([]);

  const [options, setOptions] = useState(optionsConfig(style));
  
  useEffect(() => {
    // Load when the Sides first loads
    if (dataState === "idle") {
      dispatch(getDataAverageByDay({ selectedTime, selectedData }));
      // TODO: Make selected Data dependet of the selected Value
    }
  }, [dataState]);

  useEffect(() => {
    // Change Series to refresh chart data as soon as the data changes
    if (data) {
      let list = []
      for(let key in data){
        list.push({name: key, data: data[key]})
      }
      setSeries(list)
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

    if(selectedData === 0){ // PH Selected
      setOptions({...options, colors: style.pHShades, 
        title: {text: "Means per day of last 7 days - "+ selectedData},
        yaxis: {
          title: {
              text: "[-]",
          },
          min: 0,
          max: 14,
      }})
    }else if(selectedData === 1){ // TDS Selected
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
