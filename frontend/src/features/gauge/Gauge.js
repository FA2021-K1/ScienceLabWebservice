import GaugeChart from 'react-gauge-chart'
import { useDispatch, useSelector } from "react-redux";

export const Gauge = () => {
    const style = useSelector((state) => state.style)
    const data = useSelector(state => state.data.data)
    return (
        <div>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#263238", marginTop: "5px", marginLeft: "8px" }}>
                Current Water Quality
            </div>
            <GaugeChart id="gauge-chart1"
                nrOfLevels='10'
                hideText="true"
                colors={[style.warningColor,
                style.accentColor1,
                style.lightGreen]}
                percent={0.86} />
            <h4 align="left"> Latest measurement means of buoys</h4>
            <h5 align="left"> ph-Value: {data ? data['0'][0]["value"] : null} </h5>
            <h5 align="left"> TDS: {data ? data['0'][0]["value"] : null} ppm</h5>
        </div>


    )
}
