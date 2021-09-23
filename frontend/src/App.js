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

import { getJsonData } from "./dataSlice";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const App = () => {
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
              <LineChart />
            </Item>
          </Grid>
          <Grid item xs={4} xl={4} className="App-GridItem">
            <Item>
              <Boxplot />
            </Item>
          </Grid>
          <Grid item xs={4} xl={4} className="App-GridItem">
            <Item>
              <Boxplot />
            </Item>
          </Grid>

          <Grid item xs={4} xl={4}>
            <Item className="App-GridItem">
              <ValueList />
            </Item>
          </Grid>
          <Grid item xs={8} xl={8} className="App-GridItem">
            <Item>
              <LineChart />
            </Item>
          </Grid>
        </Grid>
      </body>
    </React.StrictMode>
  );
};

export default App;
