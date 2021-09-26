import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { optionsConfig } from "./boxplotConfig";

export const Boxplot = () => {
  const dispatch = useDispatch();
  const style = useSelector((state) => state.style);
  const selectedTime = useSelector((state) => state.data.selectedTime);
  const data = useSelector((state) => state.data.dataAverageByDay);
  const dataState = useSelector((state) => state.data.dataAverageByDayState);
  const selectedData = useSelector(state => state.data.selectedData)
  const [chartObj, setChartObj] = useState(null)

  const [series,] = useState([
    {
      name: "BoxPlot",
      type: "boxPlot",
      data: [
        {
          x: 'Bouy 1',
          y: [5, 6, 4.7, 5, 4, 4, 4.8],
        },
        {
          x: 'Bouy 2',
          y: [3.9, 5, 4.9, 6.1, 5.2, 6, 4.8],
        },
        {
          x: 'Bouy 3',
          y: [5.8, 4, 5.2, 6.7, 4.9, 3.9, 5.2],
        },
      ],
    },
    {
      name: "Outliers",
      type: "scatter",
      data: [
        {
          x: 'Bouy 1',
          y: 2,
        },
        {
          x: 'Bouy 2',
          y: 1
        },
        {
          x: 'Bouy 3',
          y: 1.2,
        },
      ],
    },
  ]);

  const [options, setOptions] = useState(optionsConfig(style));

  useEffect(() => {
    if(selectedData === "pH"){
      setOptions({...options, 
        title: {text: "Data of last 24 h - "+ selectedData},
        yaxis: {
          title: {
              text: "[-]",
          },
          min: 0,
          max: 14,
      }})
    }else if(selectedData === "TDS"){
      setOptions({...options,
        title: {text: "Data of last 24 h - "+ selectedData},
        yaxis: {
          title: {
              text: "[ppm]",
          },
          min: 100,
          max: 1000,
      }})
    }
  }, [selectedData])

  return (
    <div id="chart">
      <Chart
        options={options}
        series={series}
        type="boxPlot"
        height={'350'}>
      </Chart>

    </div>
  );
};
