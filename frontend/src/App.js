import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import "./App.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import { Header } from "./features/header/Header.js";

import { LineChart } from "./features/lineChart/LineChart";

import { Mapbox } from "./features/mapbox/Mapbox";
import { Boxplot } from "./features/boxplot/Boxplot";
import { ValueList } from "./features/valueList/ValueList";
import { ZoomableChart } from "./features/zoomableChart/zoomableChart";
import { ColumnChart } from "./features/columnChart/ColumnChart";
import GaugeChart from 'react-gauge-chart'



import { getJsonData } from "./dataSlice";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: "400px",
  justifyContent: "center",
  alignItems: "center"
}));

export const App = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data.dataState);
  const style = useSelector((state) => state.style)
  //const data = useSelector((state) => state.data.data);

  useEffect(() => {
    if (dataState === "idle") {
      dispatch(getJsonData());
    }
  }, [dispatch, dataState, style]);
  return (
    <React.StrictMode>
      <Header />
      <body className="App-background">
        <Grid
          container
          spacing={2}
          alignItems="center"
          className="App-Grid"
          autoWidth="true"
          autoHeight = "true"
        >
          <Grid item xs={12} xl={12} >
            <Item style ={{ height :"525px"}}>
              <Mapbox />
            </Item>
          </Grid>
          <Grid item xs={3} xl={3} alignItems = "center">
            <Item >
              <h4 align = 'left'> Overall current water quality </h4>
          <GaugeChart id="gauge-chart1" 
          nrOfLevels = '4'
          colors={[style.warningColor, style.accentColor2,style.accentColor1, style.primaryColor]}/>
          </Item>
          </Grid>
          <Grid item xs={3} xl={3} >
            <Item>
              <ColumnChart />
            </Item>
          </Grid>
          <Grid item xs={3} xl={3}>
            <Item>
              <Boxplot />
            </Item>
          </Grid>
          <Grid item xs={3} xl={3}>
            <Item>
              <LineChart />
            </Item>
          </Grid>

          <Grid item xs={3} xl={3}>
            <Item style={{ height :"550px"}} >
              <ValueList />
            </Item>
          </Grid>
          <Grid item xs={9} xl={9} >
            <Item style ={{ height :"550px"}} >
              <ZoomableChart />

            </Item>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h5 align='center'> © Ferienakdemie 2021, Ferienakademie Inc. Made with <span role="img" aria-label="heart">❤️️</span> in Sarntal!</h5>
        </Grid>
      </body>
    </React.StrictMode>
  );
};

export default App;
