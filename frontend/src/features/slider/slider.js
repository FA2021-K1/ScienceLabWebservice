import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { subDays, startOfToday, format } from "date-fns";
import "./slider.css";

export const SliderContainer = () => {
  const stepSize = 3 * 60 * 60 * 1000;
  const todayStart = startOfToday();

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

  const dateFormatter = (ms) => {
    return format(new Date(ms), "MMM dd h a");
  };

  const roundHours = (date) => {
    date.setHours(date.getHours() - (date.getHours() % 3));
    return date;
  };
  const currentTimeRounded = roundHours(new Date());

  return (
    <Box sx={{ m: 4, width: 350, height: 100, border: "1px solid red" }}>
      <Slider
        className="slider"
        aria-label="Always visible"
        defaultValue={currentTimeRounded}
        valueLabelFormat={(value) => <div>{dateFormatter(value)}</div>}
        min={subDays(currentTimeRounded, 7).getTime()}
        max={currentTimeRounded.getTime()}
        step={stepSize}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
};
