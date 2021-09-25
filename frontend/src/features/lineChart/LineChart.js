import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { optionsConfig } from "./lineChartConfig";

export const LineChart = () => {
  const style = useSelector((state) => state.style);
  const currentDate = useSelector((state) => state.data.selectedTime)
  // const data = useSelector(state => state.data.data) 

  const [series,] = useState([
    {
      name: "pHS",
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: "Dissolved solids",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
  ]);
  const [options, setOptions] = useState(optionsConfig(style));

  useEffect(() => {
    const dates = [6, 5, 4, 3, 2, 1, 0]
    let optionsCarry = options
    optionsCarry.xaxis.categories = dates.map((dateDifference) => new Date(new Date().setDate(currentDate.getDate() - dateDifference)).toLocaleDateString())
    setOptions(optionsCarry)
    console.log(options.xaxis.categories)
  }, [currentDate])
  return (
    <div id="chart">
      <Chart options={options} series={series} type="line"
        height={'350'} />
    </div>
  );
};
