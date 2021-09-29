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
  const selectedData = useSelector((state) => state.data.selectedData)
  const style = useSelector((state) => state.style);

  const [selectedSpan, setSelectedSpan] = useState("fiveYears");


  const [series, setSeries] = useState([]);

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
      style: {
        color: style.textColor,
      },
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
          return Math.round(value * 10) / 10;
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
        getDataBySpan({ selectedData: selectedData, selectedSpan: selectedSpan })
      );
    }
  }, [selectedSpan, dataState, selectedData]);

  useEffect(() => {
    if (data) {
      dispatch(
        getDataBySpan({ selectedData: selectedData, selectedSpan: selectedSpan })
      );
    }
  }, [selectedSpan, selectedData]);

  useEffect(() => {
    if (data) {

      let list = [];
      for (let key in data) {
        list.push({ name: key, data: data[key] });
      }
      setSeries(list);
    }
  }, [data]);


  return (
    <div id="chart">
      <ToggleButtonGroup
        value={selectedSpan}
        onChange={(e) => {
          setSelectedSpan(e.target.value);
          let text;
          switch (selectedData) {
            case "0":
              text = "pH Value [-]";
              break;
            case "1":
              text = "TDS Value [-]";
              break;
            default:
              text = "Weird measurement stuff";
          }
          setOptions({ ...options, yaxis: { title: { text: text } } });
        }}
        size="small"
        aria-label="spanSelection"

        sx={{ paddingRight: '10px' }}

      >
        <ToggleButton
          value="fiveYears"
          aria-label="fiveYears"
          sx={{ height: "30px", fontSize: 12 }}
        >
          5y
        </ToggleButton>
        <ToggleButton
          value="oneYear"
          aria-label="oneYear"
          sx={{ height: "30px", fontSize: 12 }}
        >
          1y
        </ToggleButton>
        <ToggleButton
          value="oneMonth"
          aria-label="oneMonth"
          sx={{ height: "30px", fontSize: 12 }}
        >
          1m
        </ToggleButton>
        <ToggleButton
          value="oneWeek"
          aria-label="oneWeek"
          sx={{ height: "30px", fontSize: 12 }}
        >
          1w
        </ToggleButton>
        <ToggleButton
          value="oneDay"
          aria-label="oneDay"
          sx={{ height: "30px", fontSize: 12 }}
        >
          1d
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        size="small"
        color='primary'
        value={"pH"}
        exclusive

        onChange={(e) => {
          setSelectedData(e.target.value);
        }}
      >
        <ToggleButton value="0" sx={{ height: "30px", fontSize: 12 }}>
          pH
        </ToggleButton>
        <ToggleButton value="1" sx={{ height: "30px", fontSize: 12 }}>
          TDS
        </ToggleButton>

      </ToggleButtonGroup>
      <Chart options={options} series={series} type="area" height={450} />
    </div>
  );
};
