import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export const ColumnChart = () => {

    const [series,] = useState([
        {
            name: 'Bouy 1',
            data: [44, 55]
        }, {
            name: 'Bouy 2',
            data: [76, 85]
        }, {
            name: 'Bouy 3',
            data: [35, 41]
        }]);

    const [options,] = useState({
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['pH Value', 'Dissolved Solids'],
        },
        yaxis: {
            title: {
                text: '$ (thousands)'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + " thousands"
                }
            }
        }
    });


    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
    );
};
