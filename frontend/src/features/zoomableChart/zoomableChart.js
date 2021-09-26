import Chart from "react-apexcharts";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataBySpan } from "../../dataSlice";

//import dummyData from "data_context";

export const ZoomableChart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.dataBySpan);
  const dataState = useSelector((state) => state.data.dataBySpanState);

  const [selectedSpan, setSelectedSpan] = useState("fiveYears");

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

  useEffect(() => {
    if (dataState === "idle") {
      dispatch(
        getDataBySpan({ selectedData: "TDS", selectedSpan: selectedSpan })
      );
    }
  }, [selectedSpan, dataState]);

  useEffect(() => {
    if (data) {
      //setSeries(data)
      // TODO: Add Data as soon as backend is done
    }
  }, [data]);
  return (
    <div id="chart">
      <ToggleButtonGroup
        value={selectedSpan}
        onChange={(e) => {
          setSelectedSpan(e.target.value);
          dispatch(
            getDataBySpan({ selectedData: "TDS", selectedSpan: selectedSpan })
          );
        }}
        size="small"
        aria-label="spanSelection"
      >
        <ToggleButton value="fiveYears" aria-label="fiveYears">
          5y
        </ToggleButton>
        <ToggleButton value="oneYear" aria-label="oneYear">
          1y
        </ToggleButton>
        <ToggleButton value="oneMonth" aria-label="oneMonth">
          1m
        </ToggleButton>
        <ToggleButton value="oneWeek" aria-label="oneWeek">
          1w
        </ToggleButton>
        <ToggleButton value="oneDay" aria-label="oneDay">
          1d
        </ToggleButton>
      </ToggleButtonGroup>
      <Chart options={options} series={series} type="area" height={450} />
    </div>
  );
};
