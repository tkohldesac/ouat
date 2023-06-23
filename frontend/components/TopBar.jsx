import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    appBar: {
        width: '100%',
        top: 0,
        zIndex: theme.zIndex.drawer + 1,
    },
}));

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
});

const cardStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TopBar() {



    return (

        <div style={{ position: "absolute", width: '100%', top: 0, left: 0 }}>
            <AppBar position="static" style={{ backgroundColor: '#F6E6CC', height: '60px' }}>
                Words
            </AppBar>

        </div>
    );
};

