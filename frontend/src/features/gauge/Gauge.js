import GaugeChart from 'react-gauge-chart'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';

export const Gauge = () => {
    const style = useSelector((state) => state.style)
    const data = useSelector(state => state.data.latestData)

    const [percentValue, setPercentValue] = useState(0);

    useEffect(() => {
        if (data) {
            let list = [];
            for (let key in data) {
                list.push(data[key][0].value);
            }
            var sum = list.reduce(function (a, b) {
                return a + b;
            }, 0);
            let percentValue = calculatePercent(sum);
            setPercentValue(percentValue)

        }
    }, [data])

    function calculatePercent(sum){
        return sum / 400;
    }

    return (
        <div>

            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#263238", marginTop: "5px", marginLeft: "8px" }}>
                Current Water Quality
            </div>
            <GaugeChart id="gauge-chart1"
                nrOfLevels={10}
                hideText={true}
                colors={[style.warningColor,
                style.accentColor1,
                style.lightGreen]}
                percent={percentValue} />
            <h4 align="left"> Latest measurement means of buoys</h4>
            <h5 align="left"> ph-Value: {data ? data['0'][0]["value"] : null} </h5>
            <h5 align="left"> TDS: {data ? data['0'][0]["value"] : null} ppm</h5>

        </div>


    )
}
