import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { sortByBouy } from "../../sorting";

export const ValueList = () => {
  const jsonDataAll = useSelector((state) => state.data.data);
  const jsonData = jsonDataAll ? jsonDataAll[0] : null 
  const renderRow = ({ index }) => {
    return (
      <ListItem key={index} component="div" disablePadding>
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
      </ListItem>
    );
  };

  return (
    <Box sx={{ width: "100%", height: "100%", bgcolor: "background.paper" }}>
      <Stack spacing={2} direction="row">
        <div id="latest-data-received">
          <div>
            <h2>Latest data received</h2>
          </div>
          <div id="more-data-button">
            <Button height="100" variant="contained" href="">
              More data
            </Button>
          </div>
        </div>
      </Stack>
      {jsonData ? (
        <FixedSizeList
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
