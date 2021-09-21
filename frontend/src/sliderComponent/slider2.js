import { Component } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { subDays, startOfToday, format } from "date-fns";
import './slider.css';
import MapContainer from '../mapComponent/Map';


const marks = [
  {
    value: 0,
    label: format(subDays(startOfToday(), 7), "MMM dd"),
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: format(startOfToday(), "MMM dd"),
  },
];

function valuetext(value) {
  return `${value}°C`;
}

export class SliderContainer extends Component {

    constructor(props) {
        super(props);
    
        const today = startOfToday();
        const oneWeekAgo = subDays(today, 7);
    }

    render() {
        return (
            <Box sx={{ m: 4, width: 350, height: 100, border: "1px solid red" }}>
                <Box sx={{ m: 4, width: 350, height: 100, border: "1px solid red" }}>
                    <MapContainer
                    />
                </Box>
                <Box sx={{ m: 4, width: 350, height: 100, border: "1px solid red" }}>
                    <Slider className="slider"
                        aria-label="Always visible"
                        defaultValue={80}
                        getAriaValueText={valuetext}
                        step={10}
                        marks={marks}
                        valueLabelDisplay="on"
                    />
                </Box>
            </Box>
        );
    }
}

export default SliderContainer;