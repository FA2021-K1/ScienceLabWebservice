import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import logo from "./logo.svg";
import "./App.css";
import { LineChart } from "./lineChartComponent/LineChart";
import { MapboxContainer } from "./mapboxComponent/mapbox";
import { SliderContainer } from "./sliderComponent/slider";
import ListContainer from "./listComponent/list";
import CardContainer from "./cardComponent/card";
import reportWebVitals from "./reportWebVitals";
import Header from "./headerComponent/Header.js";
import { useDispatch, useSelector } from "react-redux";
import { getJsonData, selectData } from "./dataSlice";
import store from "./app/store";
import Boxplot from "./boxplotComponent/boxplot";

const reactStyles = {
  position: "relative",
  left: "20px",
  width: "60%",
  height: "60%",
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

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
            <Item>
              <MapboxContainer />
            </Item>
          </Grid>

          <Grid item xs={4} xl={4}>
            <Item>
              <LineChart />
            </Item>
          </Grid>
          <Grid item xs={4} xl={4}>
          <Item>
            <Boxplot />
          </Item>
          </Grid>
          <Grid item xs={4} xl={4}>
          <Item>
            <Boxplot />
          </Item>
          </Grid>

          <Grid item xs={4} xl={4}>
          <Item>
            <ListContainer />
          </Item>
          </Grid>
          <Grid item xs={8} xl={8}>
          <Item>
            <LineChart />
          </Item>
          </Grid>
        </Grid>
      </div>

      <SliderContainer />
    </React.StrictMode>
  );
}

export default App;
