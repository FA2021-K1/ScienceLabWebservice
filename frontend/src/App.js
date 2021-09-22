import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import "./App.css";

import { Header } from "./features/header/Header.js";

import { LineChart } from "./features/lineChart/LineChart";
import { MapboxContainer } from "./features/mapbox/mapbox";
import { SliderContainer } from "./features/slider/slider";
import { Boxplot } from "./features/boxplot/Boxplot";
import {ValueList} from "./features/valueList/ValueList";

import { getJsonData } from "./dataSlice";


export const App = ()  => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data.dataState);
  //const data = useSelector((state) => state.data.data);

  useEffect(() => {
    if (dataState === "idle") {
      dispatch(getJsonData());
    }
  }, [dispatch, dataState]);
  return (
    <React.StrictMode>
      <Header />

      <div>
        <Grid
          container
          spacing={2}
          justifyContent="space-evenly"
          alignItems="center"
          padding-left={100}
          padding-right={100}
        >
          <Grid item xs={12} xl={12}>
            <Box sx={{ xs: 12, height: "500", border: "1px solid red" }}>
              <MapboxContainer />
            </Box>
          </Grid>

          <Grid item xs={4} xl={4}>
            <LineChart />
          </Grid>
          <Grid item xs={4} xl={4}>
            <Boxplot />
          </Grid>
          <Grid item xs={4} xl={4}>
            <Boxplot />
          </Grid>

          <Grid item xs={4} xl={4}>
            <ValueList />
          </Grid>
          <Grid item xs={8} xl={8}>
            <LineChart />
          </Grid>
        </Grid>
      </div>

      <SliderContainer />
    </React.StrictMode>
  );
}

export default App;
