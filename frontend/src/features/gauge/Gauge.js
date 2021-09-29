import GaugeChart from 'react-gauge-chart'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';

export const Gauge = () => {
    const style = useSelector((state) => state.style)
    const data = useSelector(state => state.data.latestData)

    const [percentValue, setPercentValue] = useState(0);
    const [pHAverage, setpHAverage] = useState(0);
    const [TDSAverage, setTDSAverage] = useState(0);
    const [pHAverageMargin, setpHAverageMargin] = useState(0);
    const [TDSAverageMargin, setTDSAverageMargin] = useState(0);
      

    useEffect(() => {
        if (data) {
            let pHList = [];
            let TDSList = [];
            for (let key in data) {
                pHList.push(data[key]["0"].value);
                TDSList.push(data[key]["1"].value);
            }
            const pHSum = pHList.reduce(function (a, b) {
                return a + b;
            }, 0);
            const TDSSum = TDSList.reduce(function (a, b) {
                return a + b;
            }, 0);
            
            const pHAvg = (pHSum / pHList.length);
            const TDSAvg = (TDSSum / TDSList.length);
            const percentValueNew = calculatePercent(pHAvg, TDSAvg);
            if (percentValueNew !== percentValue) {
                setPercentValue(percentValueNew)
            }
            setpHAverage(pHAvg);
            setTDSAverage(TDSAvg);
            setpHAverageMargin(pHAvg * 18.05 + 1);
            setTDSAverageMargin(TDSAvg * 0.246 + 5);

        }
    }, [data])

    function calculatePercent(pHAvg, TDSAvg) {

        //100% = ph:7
        
        var pH = Math.abs(pHAvg - 7);
        var pHPercent = 1 - pH/7;
        console.log("pHPercent"+pHPercent);

        var TDSThreshold = 400;
        var TDSMax = 1200;
        var TDSPercent;
        console.log("TDSvg"+ TDSAvg);
        console.log("(TDSAvg)/(TDSMax - TDSThreshold)"+(TDSAvg)/(TDSMax - TDSThreshold));
        if (TDSAvg > TDSThreshold)
        {
            TDSPercent = 1 - (TDSAvg-TDSThreshold)/(TDSMax);
        }
        else 
            TDSPercent = 1;
        console.log("TDSPercent" +TDSPercent);
        return (pHPercent+TDSPercent)/2;
    }

    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }

    function roundToOne(num) {
        return +(Math.round(num + "e+1")  + "e-1");
    }


    return (
        <div style={{height:"100%"}}>

            <div style={{ fontSize: "14px", fontWeight: "bold", color: style.textColor, marginTop: "2.5px", marginLeft: "8px" }}>
                Current Water Quality
            </div>
            <GaugeChart id="gauge-chart1"
                nrOfLevels={10}
                hideText={true}
                colors={[style.warningColor,
                style.accentColor1,
                style.lightGreen]}
                percent={percentValue} 
                style = {{height:"50%"}}/>
            <h4 align="left" style={{ fontSize: "14px", marginLeft: "8px", color: style.textColor, marginTop:"-10px"}}> Latest measurement means of buoys</h4>
            <h5 align="left" style={{ fontSize: "12px", marginLeft: "8px", color: style.textColor }}> ph-Value: {pHAverage ? roundToOne(pHAverage) : null} </h5> 
            <div style={{ marginTop: "-10px", marginLeft: "17px" }}>
                <img src="pHColorScale.png" style={{ opacity: "0.85", width: "270px" }} />
                <div style={{ marginTop: "-17px", marginLeft: pHAverageMargin + "px" }}>
                    <img src="arrow_fill.png" style={{ opacity: "0.85", width: "15px" }} />
                </div>
            </div>

            <h5 align="left" style={{ fontSize: "12px", marginLeft: "8px", color: style.textColor, marginTop:"-5px" }}> TDS: {TDSAverage ? roundToTwo(TDSAverage) : null} ppm</h5> 
            <div style={{ marginTop: "-10px", marginLeft: "17px"  }}>
                <img src="TDSColorScale.png" style={{ opacity: "0.85", width: "270px" }} />
                <div style={{ marginTop: "-17px", marginLeft: TDSAverageMargin + "px" }}>
                    <img src="arrow_fill.png" style={{ opacity: "0.85", width: "15px" }} />
                </div>
            </div>
        </div>


    )
}
