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
      name: 'box',
      type: 'boxPlot',
      data: [
        {
          x: 1,
          y: [31, 39, 45, 51, 59]
        },
        {
          x: 2,
          y: [39, 46, 55, 65, 71]
        },
        {
          x: 3,
          y: [29, 31, 35, 39, 44]
        }
      ]
    },
    {
      name: 'outliers',
      type: 'scatter',
      data: [
        {
          x: 1,
          y: 64
        },
        {
          x: 2,
          y: 27
        },
        {
          x: 2,
          y: 78
        },
        {
          x: 3,
          y: 15
        }
      ]
    }
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
      },
      plotOptions: {
        boxPlot: {
            colors: {
                upper: style.pH,
                lower: style.pH
            },
        }
    },
    })
    }else if(selectedData === "TDS"){
      setOptions({...options,
        title: {text: "Data of last 24 h - "+ selectedData},
        yaxis: {
          title: {
              text: "[ppm]",
          },
      },
      plotOptions: {
        boxPlot: {
            colors: {
                upper: style.TDS,
                lower: style.TDS
            },
        }
    },})
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
