import GaugeChart from 'react-gauge-chart'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';

export const Gauge = () => {
    const style = useSelector((state) => state.style)
    const data = useSelector(state => state.data.latestData)

    const [percentValue, setPercentValue] = useState(0);
    const [pHAverage, setpHAverage] = useState(0);
    const [TDSAverage, setTDSAverage] = useState(0);

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
            setpHAverage(7 * 18.05 + 1);
            setTDSAverage(600 * 0.246 + 5);

        }
    }, [data])

    function calculatePercent(sum) {
        return sum / 400;
    }

    return (
        <div>

            <div style={{ fontSize: "14px", fontWeight: "bold", color: style.textColor, marginTop: "5px", marginLeft: "8px" }}>
                Current Water Quality
            </div>
            <GaugeChart id="gauge-chart1"
                nrOfLevels={10}
                hideText={true}
                colors={[style.warningColor,
                style.accentColor1,
                style.lightGreen]}
                percent={percentValue} />
            <h4 align="left" style={{ fontSize: "14px", marginLeft: "8px", color: style.textColor }}> Latest measurement means of buoys</h4>
            <h5 align="left" style={{ fontSize: "12px", marginLeft: "8px", color: style.textColor }}> ph-Value: {data ? data['0'][0]["value"] : null} </h5>
            <div style={{ marginTop: "-10px", marginLeft: "17px" }}>
                <img src="pHColorScale.png" style={{ opacity: "0.85", width: "270px" }} />
                <div style={{ marginTop: "-17px", marginLeft: pHAverage + "px" }}>
                    <img src="arrow_fill.png" style={{ opacity: "0.85", width: "15px" }} />
                </div>
            </div>

            <h5 align="left" style={{ fontSize: "12px", marginLeft: "8px", color: style.textColor }}> TDS: {data ? data['0'][0]["value"] : null} ppm</h5>
            <div style={{ marginTop: "-10px", marginLeft: "17px"  }}>
                <img src="TDSColorScale.png" style={{ opacity: "0.85", width: "270px" }} />
                <div style={{ marginTop: "-17px", marginLeft: TDSAverage + "px" }}>
                    <img src="arrow_fill.png" style={{ opacity: "0.85", width: "15px" }} />
                </div>
            </div>
        </div>


    )
}
