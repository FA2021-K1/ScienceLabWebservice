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
        colors: [style.pH, style.warningColor],
        title: {
            text: "BoxPlot - Last 24 h",
            align: "left",
        },
        xaxis: {
            type: "numeric",
            tooltip: {
                enabled: false,
            },
            tickPlacement: 'between',
            overwriteCategories: ["Bouy 1", "Bouy 2", "Bouy 3"]
        },
        plotOptions: {
            boxPlot: {
                colors: {
                    upper: style.pH,
                    lower: style.pH
                },
            }
        },
        yaxis: {
            title: {
                text: 'pH Value [-]'
            }
        },
    }
}