export const optionsConfig = (style) => {
    return {
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
        }
    }