import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import Stack from "@mui/material/Stack";


export const ValueList = () => {
    const renderRow = (props)  => {
        const { index, style, buoyID, measurementValue, timeStamp } = props;
      
        return (
          <ListItem
            style={style}
            key={index}
            buoy={buoyID}
            measurement={measurementValue}
            time={timeStamp}
            component="div"
            disablePadding
          >
            <ListItem>
              <ListItemText
                primary={`Sensor ${index + 1}`}
                secondary={`Buoy ${buoyID}`}
              />
      
              <ListItemText
                align="right"
                primary={`Value ${measurementValue}`}
                secondary={`time ${timeStamp}`}
              />
            </ListItem>
          </ListItem>
        );
      }

  return (
    <Box sx={{ width: "100%", height: 600, bgcolor: "background.paper" }}>

      <Stack spacing={2} direction="row">
        <div id="latest-data-received">
          <div>
            <h2>Latest data received</h2>
          </div>
          <div id="more-data-button">
            <Button height ='100' variant="contained" href="">
              More data
            </Button>
          </div>
        </div>
      </Stack>

      <FixedSizeList
        height={400}
        itemSize={50}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
};
