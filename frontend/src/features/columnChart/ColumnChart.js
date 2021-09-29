import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { roundToOne } from "../../helperFunctions";

export const ColumnChart = () => {

    const style = useSelector((state) => state.style);
    const data = useSelector((state) => state.data.latestData);

    const [series, setSeries] = useState([]);

    const [options, setOptions] = useState({
        chart: {
            type: "bar",
            height: 350,
        },
        colors: [style.pH, style.TDS],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded",
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
        },
        xaxis: {
            categories: ["Bouy 1", "Bouy 2", "Bouy 3"],
        },
        yaxis: [
            {
                min: undefined,
                max: undefined,
                title: {
                    text: "pH Value [-]",
                },
                labels: {
                    formatter: (value) => {
                      return Math.round(value);
                    },
                  },
            },
            {
                opposite: true,
                min: undefined,
                max: undefined,
                title: {
                    text: "Dissolved Solids [ppm]",
                },
                labels: {
                    formatter: (value) => {
                      return Math.round(value);
                    },
                  },
            },
        ],
        tooltip: {
            y: [{
                formatter: function(value) {
                    return roundToOne(value)
                }
            },
            {
                formatter: function(value) {
                return value
            }}
            ]
        },
        title: {
            text: "Latest measurements per buoy",
            align: "left",
            style: {
                color: style.textColor,
            }
        },
        fill: {
            opacity: 1,
        },
    });

    useEffect(() => {
        if (data) {
            let list = [];
            for (let key in data) {
                list.push(key);
            }
            setSeries([
                {
                    name: "pH-Value",
                    data: list.map((element) => data[element]["0"].value),
                },
                {
                    name: "TDS-Value",
                    data: list.map((element) => data[element]["1"].value),
                }

                // TODO: Add other Sensor Values accordingly
            ]);
            setOptions({ ...options, xaxis: { categories: list }});
        }
    }, [data]);


    return (
        <div id="chart">
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </div>
    );
};
