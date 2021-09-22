import React from "react";
import Grid from "@material-ui/core/Grid";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import logo from "./logo.svg";
import "./App.css";
import LineChart from './lineChartComponent/LineChart';
import MapContainer from "./mapComponent/Map"
import SliderContainer from "./sliderComponent/slider2"
import ListContainer from "./listComponent/list"
import CardContainer from "./cardComponent/card"
import reportWebVitals from './reportWebVitals'
import Header from './headerComponent/Header.js'
import Boxplot from "./boxplotComponent/boxplot";



const reactStyles = {
  position: "relative",
  left: '20px',
  width: '60%',
  height: '60%'
};

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <React.StrictMode>
      <Header />

      <div>
        <Grid container spacing={2}
          justifyContent="space-evenly"
          alignItems="center"
          padding-left = {100}
          padding-right = {100}>

          <Grid item xs={12} xl={12}>
            <Box sx={{ xs:12, height: '500', border: "1px solid red" }}>
              <MapContainer />
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


      
    </React.StrictMode>
  );
}

export default App;