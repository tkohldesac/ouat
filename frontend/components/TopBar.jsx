import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    appBar: {
        width: '100%',
        top: 0,
    },
}));

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
});

export default function TopBar() {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appBar} style={{ backgroundColor: '#F6E6CC', height: '60px' }}>
            <Toolbar>
                {/* Add your top bar items here */}
                TOP BAR Testing
            </Toolbar>
        </AppBar>
    );
}
