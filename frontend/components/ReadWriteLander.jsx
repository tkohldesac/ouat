import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import AdventureEntry from './AdventureEntry';
import AdventureStory from './AdventureStory';
import AboutPage from './About';

export default function CenteredTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Story" />
                <Tab label="New Adventure" />
                <Tab label="About" />

            </Tabs>
            {value === 1 && <AdventureEntry />}
            {value === 0 && <AdventureStory />}
            {value === 2 && <AboutPage />}
        </Box>
    );
}
