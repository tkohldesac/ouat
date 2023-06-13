import * as React from 'react';

import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import BuildIcon from '@mui/icons-material/Build';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import HardwareIcon from '@mui/icons-material/Hardware';
import GrassIcon from '@mui/icons-material/Grass';

export const menuItems = [

    {
        id: 0,
        label: 'Power Tools',
        icon: <HomeRepairServiceIcon />,
        department: 'power-tools'
    },
    {
        id: 1,
        label: 'Hand Tools',
        icon: <BuildIcon />,
        department: 'hand-tools'
    },
    {
        id: 2,
        label: 'Automotive',
        icon: <CarRepairIcon />,
        department: 'automotive'
    },
    {
        id: 3,
        label: 'Hardware',
        icon: <HardwareIcon />,
        department: 'hardware'
    },
    {
        id: 4,
        label: 'Lawn and Garden',
        icon: <GrassIcon />,
        department: 'lawn-and-garden'
    }
];

