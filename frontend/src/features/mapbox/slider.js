import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { subDays, startOfToday, format } from "date-fns";
import {useState}from 'react';

import { updateSelectedTime, updateSelectedData } from "../../dataSlice";
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material'

export const SliderContainer = ({ selectedTime, setSelectedTime, dateFormatter }) => {
  const stepSize = 1 * 60 * 60 * 1000;
  const todayStart = startOfToday();
  const dispatch = useDispatch();
  // const selectedData = useSelector(state => state.data.selectedData)

  const marks = [
    {
      value: subDays(todayStart, 6).getTime(),
      label: format(subDays(todayStart, 6), "MMM dd"),
    },
    {
      value: subDays(todayStart, 4).getTime(),
      label: format(subDays(todayStart, 4), "MMM dd"),
    },
    {
      value: subDays(todayStart, 2).getTime(),
      label: format(subDays(todayStart, 2), "MMM dd"),
    },
    {
      value: todayStart.getTime(),
      label: format(todayStart, "MMM dd"),
    },
  ];

  const roundHours = (date) => {
    date.setHours(date.getHours()+2);
    return date;
  };
  const currentTimeRounded = roundHours(new Date());
  const style = useSelector((state) => state.style)
  const handleValueChange = (event, newAlignment) => {
    if (newAlignment !== null) { //enforce selection
      setAlignment(newAlignment);}
    dispatch(updateSelectedData(newAlignment))
  };
  const [alignment, setAlignment] = useState('pH');
  return (
    <div>
    <Box sx={{ width: 350, px: 2, py: 1 }}>
    <ToggleButtonGroup
      size = "small"
        color='primary'
        value={alignment}
        exclusive
        onChange={handleValueChange}
      >
        <ToggleButton value="pH">pH</ToggleButton>
        <ToggleButton value="TDS">TDS</ToggleButton>
      </ToggleButtonGroup>
      <hr style={{color:style.lightGray, opacity: "50%"}}/>
      <Slider
        sx={{ color: style.primaryColor }}
        aria-label="Always visible"
        valueLabelFormat={(value) => <div>{dateFormatter(new Date(value))}</div>}
        min={subDays(currentTimeRounded, 7).getTime()}
        max={currentTimeRounded.getTime()}
        step={stepSize}
        marks={marks}
        value={selectedTime}
        valueLabelDisplay="auto"
        size="medium"
        onChange={(e) => {
          var time = new Date(e.target.value);
          setSelectedTime(time.setHours(time.getHours()));
        }}
        onChangeCommitted={() => {
          dispatch(updateSelectedTime(selectedTime));
        }}
      />
    </Box>
    </div>
  );
};
