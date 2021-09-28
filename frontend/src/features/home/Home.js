import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import "../../App.css";
import "./home.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import { LineChart } from "../../features/lineChart/LineChart";

import { Mapbox } from "../../features/mapbox/Mapbox";
import { Boxplot } from "../../features/boxplot/Boxplot";
import { ValueList } from "../../features/valueList/ValueList";
import { ZoomableChart } from "../../features/zoomableChart/zoomableChart";
import { ColumnChart } from "../../features/columnChart/ColumnChart";
import { Gauge } from "../../features/gauge/Gauge";
import { Kpi } from "../../features/kpi/Kpi";

import { getLatestData } from "../../dataSlice";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  height: "400px",
  justifyContent: "center",
  alignItems: "center",
}));

export const Home = () => {
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
  }, [selectedTime]);
  return (
    <React.StrictMode>
      <div className="App-background">
        <Grid
          container
          spacing={2}
          // alignItems="center"
          className="App-Grid"
          justifyContent="center"
          wrap="wrap"
          style={{ overflow: "auto" }}
        >
          <Grid item xs={12}>
            <Kpi />
          </Grid>
          <Grid item xs={12}>
            <Item style={{ height: "545px" }}>
              <Mapbox />
            </Item>
          </Grid>
          <Grid item md={3} xs={12}>
            <Item>
              <Gauge />
            </Item>
          </Grid>
          <Grid item md={3} xs={12}>
            <Item>
              <ColumnChart />
            </Item>
          </Grid>
          <Grid item md={3} xs={12}>
            <Item>
              <Boxplot />
            </Item>
          </Grid>
          <Grid item md={3} xs={12}>
            <Item>
              <LineChart />
            </Item>
          </Grid>

          <Grid item md={3} xs={12}>
            <Item style={{ height: "550px" }}>
              <ValueList />
            </Item>
          </Grid>
          <Grid item md={9} xs={12}>
            <Item style={{ height: "550px" }}>
              <ZoomableChart />
            </Item>
          </Grid>
        </Grid>

        <Grid item md={12} xs={12}>
          <h5 align="center">
            © Ferienakdemie 2021, Ferienakademie Inc. Made with{" "}
            <span role="img" aria-label="heart">
              ❤️️
            </span>
            in Sarntal!
          </h5>
          <p align="center" style={{ fontSize: "12px" }}>
            Icons erstellt von{" "}
            <a href="https://www.freepik.com" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/de/" title="Flaticon">
              www.flaticon.com
            </a>
          </p>
          <p>
            Buoy by Andrejs Kirma from the Noun Project, camera drone by Larea
            from the Noun Project,Data by Icon Master from the Noun Project,date
            by Zky Icon from the Noun Project
          </p>
        </Grid>
      </div>
    </React.StrictMode>
  );
};

export default Home;
