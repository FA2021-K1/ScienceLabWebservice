import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

export const ColumnChart = () => {
  const style = useSelector((state) => state.style);
  const data = useSelector((state) => state.data.latestData);


  const [series, setSeries] = useState([]);

  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    colors: [style.pH, style.TDS],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Bouy 1", "Bouy 2", "Bouy 3"],
    },
    yaxis: [
      {
        title: {
          text: "pH Value [-]",
        },
      },
      {
        opposite: true,
        title: {
          text: "Dissolved Solids [ppm]",
        },
      },
    ],
    title: {
      text: "Latest measurements per buoy",
      align: "left",
      style: {
        color: style.textColor,
      }
    },
fill: {
  opacity: 1,
    },
  });

useEffect(() => {
  if (data) {
    let list = [];
    for (let key in data) {
      list.push(key);
    }
    setOptions({ ...options, xaxis: { categories: list } });
    setSeries([
      {
        name: "pH-Value",
        data: list.map((element) => data[element]["0"].value),
      },
      {
        me: "TDS-Value",
        data: list.map((element) => data[element]["1"].value),
      }

      // TODO: Add other Sensor Values accordingly
    ]);
  }
}, [data]);


return (
  <div id="chart">
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={350}
    />
  </div>
);
};
