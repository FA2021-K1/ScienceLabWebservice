import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";

//import dummyData from "data_context";

export const ZoomableChart = () => {
  const [series, setSeries] = useState([
    {
      name: "XYZ MOTORS",
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
      ], //dummyData,
    },
    {
      name: "ABC MOTORS",
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
      ], //dummyData,
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
      <Chart options={options} series={series} type="area" height={450} />
    </div>
  );
};
