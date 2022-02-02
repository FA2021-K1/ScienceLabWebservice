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
  const styleColor = useSelector((state) => state.style);

  const dateFormatter = (time) => {
    return format(time, "MMM dd HH:mm:ss");
  }

  const renderRow = ({ index, style }) => {
    if (index < data.length) {
      let color = "white"
      let sensor;
      if (data[index].sensorTypeID === 0) {
        sensor = "pH-Value"
        if (data[index].value <= 5.5 || data[index].value >= 8.5) {
          color = styleColor.warningColorLight;
        }
      }
      if (data[index].sensorTypeID === 1) {
        sensor = "TDS-Value"
        if (data[index].value >= 700) {
          color = styleColor.warningColorLight;
        }
      }

      return (
        <ListItem key={index} style={style} component="div" disablePadding>
          <Box sx={{ width: "100%", height: "100%", bgcolor: color }}>
            <ListItem>
              <ListItemText
                primary={sensor}
                primaryTypographyProps={{
                  color: styleColor.textColor,
                  fontSize: '12px'
                }}
                secondary={`Buoy ${data[index].buoyID}`}
                secondaryTypographyProps={{
                  color: styleColor.textColor,
                  fontSize: '12px'
                }}
              />

              <ListItemText
                align="right"
                primary={data[index].value}
                primaryTypographyProps={{
                  color: styleColor.textColor,
                  fontSize: '12px'
                }}
                secondary={dateFormatter(new Date(data[index].date))}
                secondaryTypographyProps={{
                  color: styleColor.textColor,
                  fontSize: '12px'
                }}
              />
            </ListItem>
          </Box>


        </ListItem>
      );
    } else {
      return (null);
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}>
      <Stack spacing={2} direction="row">
        <div id="latest-data-received">
          <div style={{ fontSize: "14px", fontWeight: "bold", color: styleColor.textColor, marginTop: "-13px", marginLeft: "8px" }}>
            Latest data received
          </div>
          <div id="more-data-button">
            <Link to="/export">
              <Button style={{ fontSize: "12px", backgroundColor: styleColor.primaryColor }} variant="contained" href="">
                More data
              </Button>
            </Link>
          </div>
        </div>
      </Stack>
      {
        !data
          ? ("Data Loading")
          : !data.length
            ? ("No Data")
            : (
              <FixedSizeList style={{ marginTop: "20px", height: "450px" }}
                height={400}
                itemSize={50}
                itemCount={100}
              >
                {renderRow}
              </FixedSizeList>
            )
      }
    </Box>
  );
};
