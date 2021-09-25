import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import { subDays, format } from "date-fns";

//import dummyData from "data_context";

export const ZoomableChart = () => {

  const currentTime = new Date();
  
  const [series,] = useState([
    {
      name: "pH-Value",
      data: [
        {
          x: currentTime,
          y: 54
        },
        {
          x: subDays(currentTime, 1),
          y: 43,
        },
        {
          x: subDays(currentTime, 2),
          y: 31,
        },
      ],
    },
    {
      name: "Dissolved Solids",
      data: [
        {
          x: currentTime,
          y: 84
        },
        {
          x: subDays(currentTime, 1),
          y: 73,
        },
        {
          x: subDays(currentTime, 2),
          y: 82,
        },
      ],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Measurement development over time",
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: [{
      title: {
        text: 'pH Value [-]'
      }
    },
    {
      opposite: true,
      title: {
        text: 'Dissolved Solids [ppm]'
      }
    }
    ],
    xaxis: {
    type: "datetime",
    tooltip: {
      enabled: false,
    },
  },
    tooltip: {
    shared: true,
    y: {
      formatter: function (val) {
        return (val / 1000000).toFixed(0);
      },
    },
  },
  });

return (
  <div id="chart">
    <Chart
      options={options}
      series={series}
      type="area"
      height={450}
    />
  </div>
);
};
