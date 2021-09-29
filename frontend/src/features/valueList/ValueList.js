import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import Stack from "@mui/material/Stack";
import { format } from "date-fns";

import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { sortByBouy } from "../../sorting";

export const ValueList = () => {
  const data = useSelector((state) => state.data.dataOfLastDayRaw);
  console.log(data);
  const style = useSelector((state) => state.style);

  const dateFormatter = (time) => {
    return format(time, "MMM dd HH:mm:ss");
  }
  
  const renderRow = ({ index }) => {
    let color = "white"
    let sensor;
    if (data[index].sensorTypeID === 0) {
      sensor = "pH-Value"
      if (data[index].value <= 5.5 || data[index].value >= 9) {
        color = style.warningColorLight;
      }
    }
    if (data[index].sensorTypeID === 1) {
      sensor = "TDS-Value"
      if (data[index].value >= 800) {
        color = style.warningColorLight;
      }
    }
    
    return (
      <ListItem key={index} component="div" disablePadding>
        <Box sx={{ width: "100%", height: "100%", bgcolor: color }}>
          <ListItem>
            <ListItemText 
              primary={sensor}
              primaryTypographyProps={{
                color: style.textColor,
                fontSize: '12px'
              }}
              secondary={`Buoy ${data[index].bouyID}`}
              secondaryTypographyProps={{
                color: style.textColor,
                fontSize: '12px'
              }}
            />

            <ListItemText
              align="right"
              primary={data[index].value}
              primaryTypographyProps={{
                color: style.textColor,
                fontSize: '12px'
              }}
              secondary={dateFormatter(new Date(data[index].date))}
              secondaryTypographyProps={{
                color: style.textColor,
                fontSize: '12px'
              }}
            />
          </ListItem>
        </Box>


      </ListItem>
    );
  };

  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}>
      <Stack spacing={2} direction="row">
        <div id="latest-data-received">
          <div style={{ fontSize: "14px", fontWeight: "bold", color: style.textColor, marginTop: "-13px", marginLeft: "8px" }}>
            Latest data received
          </div>
          <div id="more-data-button">
            <Link to="/export">
            <Button style={{ fontSize: "12px", backgroundColor: style.primaryColor}} variant="contained" href="">
                  More data
                </Button>
            </Link>
          </div>
        </div>
      </Stack>
      {data ? (
        <FixedSizeList style={{ marginTop: "20px", height: "450px" }}
          height={400}
          itemSize={50}
          itemCount={data.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      ) : (
        "Data Loading"
      )}
    </Box>
  );
};
