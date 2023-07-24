import React from 'react';
import { AppBar, ThemeProvider, Modal, Popover, List, ListItem, ListItemText } from '@mui/material';
import { Button, Typography, ButtonGroup } from '@material-ui/core';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Person2Icon from '@mui/icons-material/Person2';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CreatePersonModal from './forms/CreatePersonModal';
import CreatePlaceModal from './forms/CreatePlaceModal';
import CreateThingModal from './forms/CreateThingModal';
import ViewPersonModal from './forms/ViewPeopleModal';
import ViewPlaceModal from './forms/ViewPlacesModal';
import ViewThingModal from './forms/ViewThingsModal';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'secondary',
  },
  button: {
    color: '#f4a2fd',
  },
  modal: {
    margin: 'auto',
    marginTop: '5%',
    width: 400,
  },
}));

export default function TopBar({ theme }) {
  const [personModalOpen, setPersonModalOpen] = React.useState(false);
  const [placeModalOpen, setPlaceModalOpen] = React.useState(false);
  const [thingModalOpen, setThingModalOpen] = React.useState(false);
  const [viewPersonModalOpen, setViewPersonModalOpen] = React.useState(false);
  const [viewPlaceModalOpen, setViewPlaceModalOpen] = React.useState(false);
  const [viewThingModalOpen, setViewThingModalOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoverType, setPopoverType] = React.useState('');

  const openPersonModal = () => setPersonModalOpen(true);
  const closePersonModal = () => setPersonModalOpen(false);

  const openPlaceModal = () => setPlaceModalOpen(true);
  const closePlaceModal = () => setPlaceModalOpen(false);

  const openThingModal = () => setThingModalOpen(true);
  const closeThingModal = () => setThingModalOpen(false);

  const openViewPersonModal = () => setViewPersonModalOpen(true);
  const closeViewPersonModal = () => setViewPersonModalOpen(false);

  const openViewPlaceModal = () => setViewPlaceModalOpen(true);
  const closeViewPlaceModal = () => setViewPlaceModalOpen(false);

  const openViewThingModal = () => setViewThingModalOpen(true);
  const closeViewThingModal = () => setViewThingModalOpen(false);

  const handlePopoverClick = (event, popoverType) => {
    setAnchorEl(event.currentTarget);
    setPopoverType(popoverType);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopoverType('');
  };

  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <ThemeProvider theme={theme}>
      <AppBar className={classes.root}>
        <Box display="flex" alignItems="center" justifyContent="center" p={1}>
          <ButtonGroup variant="text">
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={(event) => handlePopoverClick(event, 'people')}
              className={classes.button}
            >
              <Person2Icon style={{ paddingRight: '.2rem' }} /> People
            </Button>
            <Popover
              id={id}
              open={open && popoverType === 'people'}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <List>
                <ListItem button onClick={openPersonModal}>
                  <ListItemText primary="Create" />
                </ListItem>
                <ListItem button onClick={openViewPersonModal}>
                  <ListItemText primary="View" />
                </ListItem>
              </List>
            </Popover>

            <Button
              aria-describedby={id}
              variant="contained"
              onClick={(event) => handlePopoverClick(event, 'place')}
              className={classes.button}
            >
              <LocationCityIcon style={{ paddingRight: '.2rem' }} /> Places
            </Button>
            <Popover
              id={id}
              open={open && popoverType === 'place'}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <List>
                <ListItem button onClick={openPlaceModal}>
                  <ListItemText primary="Create" />
                </ListItem>
                <ListItem button onClick={openViewPlaceModal}>
                  <ListItemText primary="View" />
                </ListItem>
              </List>
            </Popover>


            <Button
              aria-describedby={id}
              variant="contained"
              onClick={(event) => handlePopoverClick(event, 'thing')}
              className={classes.button}
            >
              <ShoppingBagIcon style={{ paddingRight: '.2rem' }} /> Things
            </Button>
            <Popover
              id={id}
              open={open && popoverType === 'thing'}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <List>
                <ListItem button onClick={openThingModal}>
                  <ListItemText primary="Create" />
                </ListItem>
                <ListItem button onClick={openViewThingModal}>
                  <ListItemText primary="View" />
                </ListItem>
              </List>
            </Popover>
          </ButtonGroup>
        </Box>
      </AppBar>
      <Modal
        open={personModalOpen}
        onClose={closePersonModal}
        className={classes.modal}
        disableEnforceFocus
      >
        <CreatePersonModal />
      </Modal>
      <Modal
        open={viewPersonModalOpen}
        onClose={closeViewPersonModal}
        className={classes.modal}
        disableEnforceFocus
        sx={{ overflow: 'auto' }}
      >
        {/* SEARCH HERE */}
        <ViewPersonModal />

      </Modal>
      <Modal
        open={placeModalOpen}
        onClose={closePlaceModal}
        className={classes.modal}
        disableEnforceFocus
      >
        <CreatePlaceModal />
      </Modal>
      <Modal
        open={viewPlaceModalOpen}
        onClose={closeViewPlaceModal}
        className={classes.modal}
        disableEnforceFocus
      >
        <ViewPlaceModal />
      </Modal>
      <Modal
        open={thingModalOpen}
        onClose={closeThingModal}
        className={classes.modal}
        disableEnforceFocus
      >
        <CreateThingModal />
      </Modal>
      <Modal
        open={viewThingModalOpen}
        onClose={closeViewThingModal}
        className={classes.modal}
        disableEnforceFocus
      >
        <ViewThingModal />
      </Modal>
    </ThemeProvider >
  );
}
