import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import logo from "./logo.svg";
import "./App.css";
import LineChart from './lineChartComponent/LineChart';
import MapContainer from "./mapComponent/Map"
import SliderContainer from "./sliderComponent/slider2"
import ListContainer from "./listComponent/list"
import CardContainer from "./cardComponent/card"
import reportWebVitals from './reportWebVitals'
import Header from './headerComponent/Header.js'
import { useDispatch, useSelector } from "react-redux";
import { getJsonData, selectData } from "./dataSlice";
import store from "./app/store";

const reactStyles = {
  position: "relative",
  left: '20px',
  width: '60%',
  height: '60%'
};

function App() {

  const dispatch = useDispatch();
  const data = useSelector(state => state.data.dataState);
  const dataState = useSelector(state => state.data.data);

  useEffect(() => {
    if(dataState === "idle"){
      dispatch(getJsonData());
    }
  }, [dispatch]);
  return (
    <React.StrictMode>
    <Header />
        <div>
            <Grid container spacing={100}
                justifyContent="space-evenly"
            alignItems="center"            >
                <Grid item md={5} xs={12}>
                    <LineChart />
                </Grid>
                <Grid item md={3}>
                    <Grid container spacing={100}
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"            >
                        <Grid item md={3}>
                            <CardContainer />
                        </Grid>
                        <Grid item md={3}>
                            <CardContainer />
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Grid>
        </div>
        
        
        <MapContainer />
        <SliderContainer />
        <ListContainer />
        </React.StrictMode>
  );
}

export default App;