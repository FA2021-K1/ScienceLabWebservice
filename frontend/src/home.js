import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import "./home.css"

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { LineChart } from "./features/lineChart/LineChart";
import { MapboxContainer } from "./features/mapbox/mapbox";
import { Boxplot } from "./features/boxplot/Boxplot";
import { ValueList } from "./features/valueList/ValueList";
import { ZoomableChart } from "./features/zoomableChart/zoomableChart";
import { ColumnChart } from "./features/columnChart/ColumnChart";
import { getJsonData } from "./dataSlice";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const Home = ()  => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data.dataState);
  //const data = useSelector((state) => state.data.data);

  useEffect(() => {
    if (dataState === "idle") {
      dispatch(getJsonData());
    }
  }, [dispatch, dataState]);
  return (
    <div>
      <Grid
        container
        spacing={2}
        alignItems="center"
        className = 'App-Grid'
        autoWidth = 'true'
      >
        <Grid item xs={12} xl={12}>
               <Item>
              <MapboxContainer />
              </Item>
          </Grid>

          <Grid item xs={4} xl={4} >
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
          <Grid item xs={9} xl={9} >
          <Item>
            <ZoomableChart />
            </Item>
          </Grid>
        </Grid>
    </div>
  );
}

export default Home;