import { useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

export const Boxplot = () => {
  const style = useSelector((state) => state.style);
  const [series1,] = useState([
    {
      name: "BoxPlot",
      type: "boxPlot",
      data: [
        {
          x: 'Bouy 1',
          y: [54, 66, 69, 75, 88],
        },
        {
          x: 'Bouy 2',
          y: [43, 65, 69, 76, 81],
        },
        {
          x: 'Bouy 3',
          y: [31, 39, 45, 51, 59],
        },
      ],
    }
  ]);
  const [series2,] = useState([
    {
      name: "Outliers",
      type: "scatter",
      data: [
        {
          x: 'Bouy 1',
          y: 32,
        },
        {
          x: 'Bouy 2',
          y: 25,
        },
        {
          x: 'Bouy 3',
          y: 64,
        },
      ],
    },
  ]);

  var series = series1;

  const [options,] = useState({
    chart: {
      type: "boxPlot",
      width: '400',
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
              chart.updateSeries(series2, true);
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
        },
      },
    },
    legend: {
      show: false
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: '#00E396',
          lower: '#008FFB'
        }
      }
    },
    colors: [style.primaryColor, style.warningColor],
    title: {
      text: "BoxPlot - Last 24 h",
      align: "left",
    },
    xaxis: {
      type: "categories",
      tooltip: {
        enabled: false,
      },
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: style.primaryColor,
          lower: style.secondaryColors
        }
      }
  },
    yaxis: {
      title: {
        text: 'pH Value [-]'
      }
    },
  });

  return (
    <div id="chart">
      <Chart
        options={options}
        series={series}
        type="boxPlot"
        height={'350'}>
      </Chart>

    </div>
  );
};
