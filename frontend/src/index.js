import React from 'react';
import ReactDOM from 'react-dom';
import Grid from "@material-ui/core/Grid";
import './index.css';
import App from './App';
import LineChart from './LineChart';
import MapContainer from "./mapComponent/Map"
import SliderContainer from "./sliderComponent/slider"
import ListContainer from "./listComponent/list"
import CardContainer from "./cardComponent/card"
import reportWebVitals from './reportWebVitals'
import Body from './Body.js'
import Header from './Header.js'

ReactDOM.render(
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
        
        
        
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
