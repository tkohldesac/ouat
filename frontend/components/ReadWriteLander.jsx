import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AdventureEntry from './AdventureEntry';
import AdventureStory from './AdventureStory';

export default function CenteredTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="New Entry" />
                <Tab label="Read Entries" />
            </Tabs>
            {value === 0 && <AdventureEntry />}
            {value === 1 && <AdventureStory />}
        </Box>
    );
}
