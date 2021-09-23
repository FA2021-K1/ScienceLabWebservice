import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";

//import dummyData from "data_context";

export const ZoomableChart = () => {
  const [series, setSeries] = useState([
    {
      name: "XYZ MOTORS",
      data: [0,1,2,3,4,5,6,7,8,9],//dummyData,
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
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
      title: {
        text: "pH",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
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
