import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getDataAverageByDay } from "../../dataSlice";
import { roundToOne, roundToTwo } from "../../helperFunctions";

import { useDispatch, useSelector } from "react-redux";

export const LineChart = () => {
  const dispatch = useDispatch();
  const style = useSelector((state) => state.style);
  const selectedTime = useSelector((state) => state.data.selectedTime);
  const data = useSelector((state) => state.data.dataAverageByDay);
  const dataState = useSelector((state) => state.data.dataAverageByDayState);
  const selectedData = useSelector((state) => state.data.selectedData);

  const [series, setSeries] = useState([]);

  const [options, setOptions] = useState({
    chart: {
      height: 400,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        tools: {
          download: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },

    colors: [style.TDS, style.pH],
    title: {
      text: "Average measurements",
      align: "left",
      color: style.textColor,
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
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "[ppm]",
      },
      labels: {
        formatter: (value) => {
          return Math.round(value);
        },
      },
    },
    tooltip: {
      y: {
          formatter: function(value) {
              return roundToOne(value)
          }
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center"
    },
  });

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
      let list = [];
      for (let key in data) {
        list.push({ name: key, data: data[key] });
      }
      setSeries(list);
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

    if (selectedData === 0) {
      // PH Selected
      setOptions({
        ...options,
        colors: style.pHShades,
        title: { text: "Means per day of last 7 days - pH", style:{color:style.textColor }},

        yaxis: {
          title: {
            text: "[-]",
          },
          labels: {
            formatter: (value) => {
              return Math.round(value);
            },
          },

        },
        tooltip: {
          y: {
              formatter: function(value) {
                  return roundToOne(value)
              }
          },
        },
      });
    } else if (selectedData === 1) {
      // TDS Selected
      setOptions({
        ...options,
        colors: style.TDSShades,
        title: { text: "Means per day of last 7 days - TDS", style:{color: style.textColor }},

        yaxis: {
          title: {
            text: "[ppm]",
          },
          labels: {
            formatter: (value) => {
              return Math.round(value);
            },
          },
        },
        tooltip: {
          y: {
              formatter: function(value) {
                  return roundToTwo(value)
              }
          },
        },
      });
    }
  }, [selectedData]);

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={"350"} />
    </div>
  );
};
