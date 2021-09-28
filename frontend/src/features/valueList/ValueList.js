import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import Stack from "@mui/material/Stack";

import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { sortByBouy } from "../../sorting";

export const ValueList = () => {
  const jsonDataAll = useSelector((state) => state.data.latestData);
  const jsonData = jsonDataAll ? jsonDataAll[0] : null
  const style = useSelector((state) => state.style);
  const renderRow = ({ index }) => {
    let color = "white"
    if (jsonData[index].value >= 50) {
      color = style.warningColorLight;
    }
    return (
      <ListItem key={index} component="div" disablePadding>
        <Box sx={{ width: "100%", height: "100%", bgcolor: color }}>
          <ListItem>
            <ListItemText
              primary={`Sensor ${1}`}
              secondary={`Buoy ${jsonData[index].boyId}`}
            />

            <ListItemText
              align="right"
              primary={`Value ${jsonData[index].value}`}
              secondary={`time ${jsonData[index].date}`}
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
              <Button height='100' variant="contained" href="">
                More data
              </Button>
            </Link>
          </div>
        </div>
      </Stack>
      {jsonData ? (
        <FixedSizeList style={{ height: "500px" }}
          height={400}
          itemSize={50}
          itemCount={jsonData.length}
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
