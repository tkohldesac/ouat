import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';





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

        <div style={{ position: "relative" }}>
            <AppBar position="static" style={{ backgroundColor: 'red', height: '60px' }}>

            </AppBar>


        </div>
    );
};

