import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import "./App.css";

import { Header } from "./features/headerComponent/Header.js";

import { LineChart } from "./lineChartComponent/LineChart";
import { MapboxContainer } from "./mapboxComponent/mapbox";
import { SliderContainer } from "./sliderComponent/slider";
import { Boxplot } from "./boxplotComponent/Boxplot";

import ListContainer from "./listComponent/list";

import { getJsonData, selectData } from "./dataSlice";


function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.dataState);
  const dataState = useSelector((state) => state.data.data);

  useEffect(() => {
    if (dataState === "idle") {
      dispatch(getJsonData());
    }
  }, [dispatch]);
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
            <ListContainer />
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
