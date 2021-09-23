import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { subDays, startOfToday, format } from "date-fns";

import { updateSelectedTime } from "../../dataSlice";

export const SliderContainer = ({ selectedTime, setSelectedTime, dateFormatter }) => {
  const stepSize = 3 * 60 * 60 * 1000;
  const todayStart = startOfToday();
  const dispatch = useDispatch();

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
    date.setHours(date.getHours() - (date.getHours() % 3));
    return date;
  };
  const currentTimeRounded = roundHours(new Date());

  return (
    <Box sx={{ width: 350, px: 2, py: 1 }}>
      <Slider
        aria-label="Always visible"
        defaultValue={currentTimeRounded}
        valueLabelFormat={(value) => <div>{dateFormatter(new Date(value))}</div>}
        min={subDays(currentTimeRounded, 7).getTime()}
        max={currentTimeRounded.getTime()}
        step={stepSize}
        marks={marks}
        value={selectedTime.getTime()}
        valueLabelDisplay="auto"
        size="medium"
        onChange={(e) => {
          setSelectedTime(new Date(e.target.value));
          console.log(e.target.value);
        }}
        onChangeCommitted={() => {
          dispatch(updateSelectedTime(selectedTime));
        }}
      />
    </Box>
  );
};
