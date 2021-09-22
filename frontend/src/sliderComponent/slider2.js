import { Component } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { subDays, startOfToday, format } from "date-fns";
import './slider.css';
import MapContainer from '../mapComponent/Map';

const today = startOfToday();

const marks = [
  {
    value: subDays(today, 7).getTime(),
    label: format(subDays(today, 7), "MMM dd"),
  },
  {
    value: 10,
    label: format(subDays(startOfToday(), 6), "MMM dd"),
  },
  {
    value: 20,
    label: format(subDays(startOfToday(), 5), "MMM dd"),
  },
  {
    value: 30,
    label: format(subDays(startOfToday(), 4), "MMM dd"),
  },
  {
    value: 40,
    label: format(subDays(startOfToday(), 3), "MMM dd"),
  },
  {
    value: 50,
    label: format(subDays(startOfToday(), 2), "MMM dd"),
  },
  {
    value: 60,
    label: format(subDays(startOfToday(), 1), "MMM dd"),
  },
  {
    value: 100,
    label: format(startOfToday(), "MMM dd"),
  },
];



function valuetext(value) {
  return `${value}°C`;
}

function dateFormatter(ms) {
  return format(new Date(ms), "MMM dd h:mm a");
}

export default function SliderContainer() {

    return (
        <Box sx={{ m: 4, width: 350, height: 100, border: "1px solid red" }}>
            <Slider className="slider"
                aria-label="Always visible"
                defaultValue={80}
                getAriaValueText={valuetext}
                valueLabelFormat={value => <div>{dateFormatter(value)}</div>}
                step={10}
                marks={marks}
                valueLabelDisplay="on"
            />
        </Box>
    );
}
