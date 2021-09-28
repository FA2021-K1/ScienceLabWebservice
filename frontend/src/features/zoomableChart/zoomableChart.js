import Chart from "react-apexcharts";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getDataBySpan } from "../../dataSlice";

export const ZoomableChart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.dataBySpan);
  const dataState = useSelector((state) => state.data.dataBySpanState);

  const [selectedSpan, setSelectedSpan] = useState("fiveYears");
  const [selectedData, setSelectedData] = useState("0");

  const [series, setSeries] = useState([ ]);

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
          customIcons: [],
        },
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
        text: "pH Value [-]",
      },
      labels: {
        formatter: (value) => {
          return Math.round(value);
        },
      },
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
        formatter: (val) => {
          return (val / 1000000).toFixed(0);
        },
      },
    },
  });

  useEffect(() => {
    if (dataState === "idle") {
      dispatch(
        getDataBySpan({
          selectedData: selectedData,
          selectedSpan: selectedSpan,
        })
      );
    }
  }, [selectedSpan, dataState, selectedData]);

  useEffect(() => {
    if (data) {
      dispatch(
        getDataBySpan({
          selectedData: selectedData,
          selectedSpan: selectedSpan,
        })
      );
    }
  }, [selectedSpan, selectedData]);

  useEffect(() => {
    if (data) {
      let list = []
      for(let key in data){
        list.push({name: key, data: data[key]})
      }
      setSeries(list)
      // TODO: Add Data as soon as backend is done
    }
  }, [data]);
  
  return (
    <div id="chart">
      <ToggleButtonGroup
        value={selectedSpan}
        onChange={(e) => {
          setSelectedSpan(e.target.value);
        }}
        size="small"
        aria-label="spanSelection"
        sx={{ paddingRight: "10px" }}
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
      <ToggleButtonGroup
        size="small"
        color="primary"
        value={selectedData}
        exclusive
        onChange={(e) => {
          setSelectedData(e.target.value);
        }}
      >
        <ToggleButton value="0">pH</ToggleButton>
        <ToggleButton value="1">TDS</ToggleButton>
      </ToggleButtonGroup>
      <Chart options={options} series={series} type="area" height={450} />
    </div>
  );
};
