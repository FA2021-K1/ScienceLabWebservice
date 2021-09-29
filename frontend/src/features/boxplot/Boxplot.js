import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { optionsConfig } from "./boxplotConfig";
import { getDataOfLastDay } from "../../dataSlice";
import { roundToOne, roundToTwo } from "../../helperFunctions";

export const Boxplot = () => {
  const dispatch = useDispatch();
  const style = useSelector((state) => state.style);
  const selectedTime = useSelector((state) => state.data.selectedTime);
  const data = useSelector((state) => state.data.dataOfLastDay);
  const dataState = useSelector((state) => state.data.dataOfLastDayStatus);
  const selectedData = useSelector((state) => state.data.selectedData);

  const [series, setSeries] = useState([
    {
      name: "box",
      type: "boxPlot",
      data: [],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: "boxPlot",
      width: "400",
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
    legend: {
      show: false,
    },
    colors: [style.pH, style.warningColor],
    title: {
      text: "Distribution of last 24h - pH",
      align: "left",
    },
    xaxis: {
      type: "numeric",
      tooltip: {
        enabled: false,
      },
      tickPlacement: "between",
      // overwriteCategories: ["Bouy 1", "Bouy 2", "Bouy 3"],
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: style.pH,
          lower: style.pH,
        },
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
    tooltip: {
      y: {
        formatter: function (value) {
          return roundToOne(value)
        }
      }
    }
  });

  useEffect(() => {

    if (selectedData === 0) {
      setOptions({
        ...options,
        title: {
          text: "Distribution of last 24h - pH",
          style: {
            color: style.textColor,
          },
        },
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
          }
        },
        plotOptions: {
          boxPlot: {
            colors: {
              upper: style.pH,
              lower: style.pH,
            },
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
                text: 'Optimal'
              }
            }
          ]
        }
      });
    } else if (selectedData === 1) {
      setOptions({
        ...options,
        title: {
          text: "Distribution of last 24h - TDS",
          style: {
            color: style.textColor,
          },
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
            formatter: function (value) {
              return roundToTwo(value)
            }
          }
        },
        plotOptions: {
          boxPlot: {
            colors: {
              upper: style.TDS,
              lower: style.TDS,
            },
          },
        },
        annotations: {
          yaxis: [
            {
              y: 500,
              borderColor: style.warningColor,
              label: {
                borderColor: style.warningColor,
                position: 'left',
                textAnchor: 'start',
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
  }, [selectedData]);

  useEffect(() => {
    if (dataState === "idle") {
      dispatch(getDataOfLastDay({ selectedTime, selectedData }));
    }
  }, [dataState]);

  useEffect(() => {
    if (data) {
      dispatch(getDataOfLastDay({ selectedTime, selectedData }));
    }
  }, [selectedTime, selectedData]);

  useEffect(() => {
    if (data) {
      setSeries([
        {
          name: "box",
          type: "boxPlot",
          data: data,
        },
      ]);

    }
  }, [data]);

  return (
    <div id="chart">
      <Chart
        options={options}
        series={series}
        type="boxPlot"
        height={"350"}
      ></Chart>
    </div>
  );
};
