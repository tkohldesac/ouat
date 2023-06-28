import React from 'react';
import { AppBar, ThemeProvider } from '@mui/material';
import { Button, Typography, ButtonGroup } from '@material-ui/core';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#cc00cc',
  },
  button: {
    color: '#f4a2fd',
  },
  typography: {
    textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
  },
}));

export default function TopBar({ theme }) {
  const createPerson = () => {
    console.log('Person Modal');
  };
  const createPlace = () => {
    console.log('Place Modal');
  };
  const createThing = () => {
    console.log('Thing Modal');
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppBar className={classes.root}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={1} // Add padding if desired
        >
          <ButtonGroup variant="text">
            <Button onClick={createPerson} className={classes.button}>
              <Typography variant="button" className={classes.typography}>
                Create Person
              </Typography>
            </Button>
            <Button onClick={createPlace} className={classes.button}>
              <Typography variant="button" className={classes.typography}>
                Create Place
              </Typography>
            </Button>
            <Button onClick={createThing} className={classes.button}>
              <Typography variant="button" className={classes.typography}>
                Create Thing
              </Typography>
            </Button>
          </ButtonGroup>
        </Box>
      </AppBar>
    </ThemeProvider>
  );
}
