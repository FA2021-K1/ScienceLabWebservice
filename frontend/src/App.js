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

import { getLatestData } from "./dataSlice";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const App = () => {
  const dispatch = useDispatch();
  const latestDataState = useSelector((state) => state.data.latestDataState);
  const selectedTime = useSelector((state) => state.data.selectedTime);

  useEffect(() => {
    if (latestDataState === "idle") {
      dispatch(getLatestData({ selectedTime }));
    }
  }, [dispatch, latestDataState]);

  useEffect(() => {
    if (latestDataState !== "idle") {
      dispatch(getLatestData({ selectedTime }));
    }
  }, [selectedTime])
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
        >
          <Grid item xs={12} xl={12}>
            <Item>
              <Mapbox />
            </Item>
          </Grid>

          <Grid item xs={4} xl={4}>
            <Item>
              <ColumnChart />
            </Item>
          </Grid>
          <Grid item xs={4} xl={4}>
            <Item>
              <Boxplot />
            </Item>
          </Grid>
          <Grid item xs={4} xl={4}>
            <Item>
              <LineChart />
            </Item>
          </Grid>

          <Grid item xs={3} xl={3}>
            <Item>
              <ValueList />
            </Item>
          </Grid>
          <Grid item xs={9} xl={9}>
            <Item>
              <ZoomableChart />
            </Item>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h5 align="center">
            {" "}
            © Ferienakdemie 2021, Ferienakademie Inc. Made with{" "}
            <span role="img" aria-label="heart">
              ❤️️
            </span>{" "}
            in Sarntal!
          </h5>
        </Grid>
      </body>
    </React.StrictMode>
  );
};

export default App;
