import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import { subDays, format } from "date-fns";

//import dummyData from "data_context";

export const ZoomableChart = () => {

  const currentTime = new Date();

  const [series,] = useState([
    {
      name: "Bouy 1",
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
      name: "Bouy 2",
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
    {
      name: "Bouy 3",
      data: [
        {
          x: currentTime,
          y: 75
        },
        {
          x: subDays(currentTime, 1),
          y: 68,
        },
        {
          x: subDays(currentTime, 2),
          y: 75,
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
        tools: {
          customIcons: [{
            icon: '<img src="ph.png" width="20">',
            index: 6,
            title: 'pH',
            class: 'custom-icon',
            click: function (chart, options, e) {
              console.log("button clicked")
            }
          },
          {
            icon: '<img src="TDS.png" width="20">',
            index: 7,
            title: 'TDS',
            class: 'custom-icon',
            click: function (chart, options, e) {
              console.log("clicked custom-icon")
            }
          },
          ]
        }
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
    yaxis: {
      title: {
        text: 'pH Value [-]'
      }
    },
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
