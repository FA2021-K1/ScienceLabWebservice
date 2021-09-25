import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { subDays, format } from "date-fns";

export const LineChart = () => {
  const style = useSelector((state) => state.style);
  const currentTime = new Date();
  const yesterday = subDays(currentTime, 1);

  const [series,] = useState([
    {
      name: "Bouy 1",
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: "Bouy 2",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
    {
      name: "Bouy 3",
      data: [14, 14, 18, 23, 22, 17, 13],
    },
  ]);
  const [options,] = useState({
    chart: {
      height: 400,
      type: "line",
      toolbar: {
        tools: {
          download: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: [{
            icon: '<img src="ph.png" width="20">',
            index: 1,
            title: 'pH',
            class: 'custom-icon',
            click: function (chart, options, e) {
              console.log("button clicked")
            }
          },
          {
            icon: '<img src="TDS.png" width="20">',
            index: 2,
            title: 'TDS',
            class: 'custom-icon',
            click: function (chart, options, e) {
              console.log("clicked custom-icon")
            }
          },
          ]
        }
      },
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
      },
    },
    colors: [style.Green, style.Blue],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Average measurements",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: [format(subDays(yesterday, 6), "EEE"), format(subDays(yesterday, 5), "EEE"), format(subDays(yesterday, 4), "EEE"),
      format(subDays(yesterday, 3), "EEE"), format(subDays(yesterday, 2), "EEE"), format(subDays(yesterday, 1), "EEE"), format(yesterday, "EEE")],
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      title: {
        text: "pH-Value [-]",
      },
    },
  });

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line"
        height={'350'} />
    </div>
  );
};
