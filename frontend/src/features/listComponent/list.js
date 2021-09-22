import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from 'semantic-ui-react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

//function to create list items and fill them with newest measurement data
function renderRow(props) {
    const { index, style, buoyID, measurementValue, timeStamp } = props;

    return (
        <ListItem style={style} key={index} buoy={buoyID} measurement={measurementValue} time={timeStamp} component="div" disablePadding>
            <ListItem>
                <ListItemText primary={

                    `Sensor ${index + 1}`
                }
                    secondary={`Buoy ${buoyID}`} />

                <ListItemText align="right"
                    primary={`Value ${measurementValue}`}
                    secondary={`time ${timeStamp}`} />

            </ListItem>
        </ListItem>
    );
}

export default function VirtualizedList() {
    return (
        <Box
            sx={{ width: '100%', height: 600, bgcolor: 'background.paper' }}
        >
            <div>

            </div>

            <Stack spacing={2} direction="row">
                <h2>Latest data received</h2>
                <Button height ='100' variant="contained" href="">
                    More data
                </Button>

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
}