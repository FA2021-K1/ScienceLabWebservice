export const optionsConfig = (style) => {
    return {
        chart: {
            height: 400,
            type: "line",
            dropShadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
            },
            toolbar: {
                show: false,
            },
        },
        colors: [style.Green, style.Blue],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        title: {
            text: "Average measurements",
            align: "left",
        },
        grid: {
            borderColor: "#e7e7e7",
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
            },
        },
        markers: {
            size: 1,
        },
        xaxis: {
            categories: [],
            title: {
                text: "Date",
            },
        },
        yaxis: {
            title: {
                text: "[ppm]",
            },
            min: 5,
            max: 40,
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
    }
}