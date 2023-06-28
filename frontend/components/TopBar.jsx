import React from 'react';
import { AppBar, ThemeProvider, Modal } from '@mui/material';
import { Button, Typography, ButtonGroup } from '@material-ui/core';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Person2Icon from '@mui/icons-material/Person2';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CreatePersonModal from './modals/CreatePersonModal';
import CreatePlaceModal from './modals/CreatePlaceModal';
import CreateThingModal from './modals/CreateThingModal';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'secondary',
  },
  button: {
    color: '#f4a2fd',
  },
  modal: {

    margin: 'auto',
    marginTop: '10%',
    width: 400,

  }
}));

export default function TopBar({ theme }) {
  const [personModalOpen, setPersonModalOpen] = React.useState(false);
  const [placeModalOpen, setPlaceModalOpen] = React.useState(false);
  const [thingModalOpen, setThingModalOpen] = React.useState(false);

  const openPersonModal = () => setPersonModalOpen(true);
  const closePersonModal = () => setPersonModalOpen(false);
  const openPlaceModal = () => setPlaceModalOpen(true);
  const closePlaceModal = () => setPlaceModalOpen(false);
  const openThingModal = () => setThingModalOpen(true);
  const closeThingModal = () => setThingModalOpen(false);

  const createPerson = () => {
    console.log('Person Modal');
    openPersonModal();
  };

  const createPlace = () => {
    console.log('Place Modal');
    openPlaceModal();
  };

  const createThing = () => {
    console.log('Thing Modal');
    openThingModal();
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppBar className={classes.root}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={1}
        >
          <ButtonGroup variant="text">
            <Button onClick={createPerson} className={classes.button}>
              <Person2Icon /> Create Person
            </Button>
            <Modal
              keepMounted
              open={personModalOpen}
              onClose={closePersonModal}
              className={classes.modal}
            >
              <CreatePersonModal />
            </Modal>

            <Button onClick={createPlace} className={classes.button}>
              <LocationCityIcon /> Create Place
            </Button>
            <Modal
              keepMounted
              open={placeModalOpen}
              onClose={closePlaceModal}
              className={classes.modal}
            >
              <CreatePlaceModal />

            </Modal >
            <Button onClick={createThing} className={classes.button}>
              <ShoppingBagIcon /> Create Thing
            </Button>
            <Modal
              open={thingModalOpen}
              onClose={closeThingModal}
              className={classes.modal}
            >
              <CreateThingModal />

            </Modal>
          </ButtonGroup>
        </Box>
      </AppBar>
    </ThemeProvider>
  );
}
