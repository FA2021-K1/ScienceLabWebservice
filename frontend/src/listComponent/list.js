import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
//Virtualized list

export default function BasicList() {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Divider />
            <nav aria-label="one list item">
                <List dense={false}>
                    <Divider />
                        <ListItem>
                            <ListItemText
                                primary="First line"
                                secondary={true ? 'Second line' : null}
                            />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText
                            primary="Second line"
                            secondary={true ? 'Second line' : null}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText
                            primary="Third line"
                            secondary={true ? 'Second line' : null}
                        />
                    </ListItem>
                </List>
            </nav>
            <Divider />
        </Box>
    );
}
