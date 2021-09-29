import Chart from "react-apexcharts";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getDataBySpan } from "../../dataSlice";
import { roundToTwo } from "../../helperFunctions";
import { roundToOne } from "../../helperFunctions";

export const ZoomableChart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.dataBySpan);
  const dataState = useSelector((state) => state.data.dataBySpanState);
  const style = useSelector((state) => state.style);

  const [selectedSpan, setSelectedSpan] = useState("oneMonth");
  const [selectedData, setSelectedData] = useState("0");

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
      style: {
        color: style.textColor,
      }
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
    legend: {
      formatter: (value) => {
        return "Bouy " + value;
      }
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
      for (let key in data) {
        list.push({ name: key, data: data[key] })
      }
      setSeries(list)
      console.log("selectedData" + selectedData)
      if (selectedData === "0") {
        // PH Selected
        setOptions({
          ...options,
          colors: style.pHShades,
          title: { text: "Measurement development over time - pH", style: { color: style.textColor } },

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
              formatter: function (value) {
                return roundToOne(value)
              }
            },
          },
          annotations: {
            yaxis: [
              {
                y: 6.5,
                y2: 7.5,
                borderColor: style.lightGreen,
                fillColor: style.lightGreen,
                opacity: 0.075,
                label: {
                  borderColor: style.lightGreen,
                  style: {
                    color: style.textColor,
                    fontSize: 9,
                    background: style.lightGreen
                  },
                  text: 'Optimal',
                }
              }
            ]
          }
        });
        // TODO: Add Data as soon as backend is done
      }
      else if (selectedData === "1") {
        // TDS Selected
        setOptions({
          ...options,
          colors: style.TDSShades,
          title: { text: "Measurement development over time - TDS", style: { color: style.textColor } },

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
              formatter: function (value) {
                return roundToTwo(value)
              }
            },
          },
          annotations: {
            yaxis: [
              {
                y: 500,
                borderColor: style.warningColor,
                label: {
                  borderColor: style.warningColor,
                  style: {
                    color: '#fff',
                    fontSize: 9,
                    background: style.warningColor
                  },
                  text: 'Critical above'
                }
              }
            ]
          }
        });
      }
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
        <ToggleButton value="fiveYears" aria-label="fiveYears" sx={{ height: "30px", fontSize: 12 }}>
          5y
        </ToggleButton>
        <ToggleButton value="oneYear" aria-label="oneYear" sx={{ height: "30px", fontSize: 12 }}>
          1y
        </ToggleButton>
        <ToggleButton value="oneMonth" aria-label="oneMonth" sx={{ height: "30px", fontSize: 12 }}>
          1m
        </ToggleButton>
        <ToggleButton value="oneWeek" aria-label="oneWeek" sx={{ height: "30px", fontSize: 12 }}>
          1w
        </ToggleButton>
        <ToggleButton value="oneDay" aria-label="oneDay" sx={{ height: "30px", fontSize: 12 }}>
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
        <ToggleButton value="0" sx={{ height: "30px", fontSize: 12 }}>pH</ToggleButton>
        <ToggleButton value="1" sx={{ height: "30px", fontSize: 12 }}>TDS</ToggleButton>

      </ToggleButtonGroup>
      <Chart options={options} series={series} type="area" height={450} />
    </div>
  );
};
