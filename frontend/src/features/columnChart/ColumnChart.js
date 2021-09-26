import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";

export const ColumnChart = () => {
    const style = useSelector((state) => state.style);

    const [series,] = useState([
        {
            name: 'pH Value',
            data: [44, 55, 34]
        }, {
            name: 'Dissolved Solids',
            data: [76, 85, 69]
        }]);

    const [options,] = useState({
        chart: {
            type: 'bar',
            height: 350
        },
        colors: [style.pH, style.TDS],
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
            categories: ['Bouy 1', 'Bouy 2', 'Bouy 3'],
        },
        yaxis: [{
            title: {
                text: 'pH Value [-]'
            }
        },
        {
            opposite: true,
            title: {
                text: 'Dissolved Solids [ppm]'
            }
        }
        ],
        fill: {
            opacity: 1
        },
    });


    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
    );
};
