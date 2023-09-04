import React from 'react';
import { AppBar, ThemeProvider, Modal, Popover, List, ListItem, ListItemText } from '@mui/material';
import { Button, ButtonGroup } from '@material-ui/core';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Person2Icon from '@mui/icons-material/Person2';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CreatePersonModal from './forms/CreatePersonModal';
import CreatePlaceModal from './forms/CreatePlaceModal';
import CreateThingModal from './forms/CreateThingModal';
import ViewPeopleModal from './forms/ViewPeopleModal';
import ViewPlacesModal from './forms/ViewPlacesModal';
import ViewThingsModal from './forms/ViewThingsModal';

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
    maxWidth: 600,
    overflow: 'auto'
  },
}));

export default function TopBar({ theme }) {
  const [createPersonModalOpen, setCreatePersonModalOpen] = React.useState(false);
  const [createPlaceModalOpen, setCreatePlaceModalOpen] = React.useState(false);
  const [createThingModalOpen, setCreateThingModalOpen] = React.useState(false);
  const [viewPeopleModalOpen, setViewPeopleModalOpen] = React.useState(false);
  const [viewPlacesModalOpen, setViewPlacesModalOpen] = React.useState(false);
  const [viewThingsModalOpen, setViewThingsModalOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoverType, setPopoverType] = React.useState('');

  // Create Modals

  const openCreatePersonModal = () => setCreatePersonModalOpen(true);
  const closeCreatePersonModal = () => setCreatePersonModalOpen(false);

  const openCreatePlaceModal = () => setCreatePlaceModalOpen(true);
  const closeCreatePlaceModal = () => setCreatePlaceModalOpen(false);

  const openCreateThingModal = () => setCreateThingModalOpen(true);
  const closeCreateThingModal = () => setCreateThingModalOpen(false);

  // View Modals

  const openViewPeopleModal = () => setViewPeopleModalOpen(true);
  const closeViewPeopleModal = () => setViewPeopleModalOpen(false);

  const openViewPlacesModal = () => setViewPlacesModalOpen(true);
  const closeViewPlacesModal = () => setViewPlacesModalOpen(false);

  const openViewThingsModal = () => setViewThingsModalOpen(true);
  const closeViewThingsModal = () => setViewThingsModalOpen(false);

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
                <ListItem button onClick={openCreatePersonModal}>
                  <ListItemText primary="Create" />
                </ListItem>
                <ListItem button onClick={openViewPeopleModal}>
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
                <ListItem onClick={openCreatePlaceModal}>
                  <ListItemText primary="Create" />
                </ListItem>
                <ListItem onClick={openViewPlacesModal}>
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
                <ListItem button onClick={openCreateThingModal}>
                  <ListItemText primary="Create" />
                </ListItem>
                <ListItem button onClick={openViewThingsModal}>
                  <ListItemText primary="View" />
                </ListItem>
              </List>
            </Popover>
          </ButtonGroup>
        </Box>
      </AppBar>

      {/* Create Person Modal */}
      <Modal
        open={createPersonModalOpen}
        onClose={closeCreatePersonModal}
        className={classes.modal}
        disableEnforceFocus
      >
        <CreatePersonModal closeCreatePersonModal={closeCreatePersonModal} />
      </Modal>

      {/* View People Modal */}
      <Modal
        open={viewPeopleModalOpen}
        onClose={closeViewPeopleModal}
        className={classes.modal}
        disableEnforceFocus

      >
        <ViewPeopleModal closeViewPeopleModal={closeViewPeopleModal} />
      </Modal>

      {/* Create Place Modal */}
      <Modal
        open={createPlaceModalOpen}
        onClose={closeCreatePlaceModal}
        className={classes.modal}
        disableEnforceFocus

      >
        <CreatePlaceModal closePlaceModal={closeCreatePlaceModal} />
      </Modal>

      {/* View Places Modal */}
      <Modal
        open={viewPlacesModalOpen}
        onClose={closeViewPlacesModal}
        className={classes.modal}
        disableEnforceFocus
      >
        <ViewPlacesModal closeViewPlacesModal={closeViewPlacesModal} />

      </Modal>
      {/* Create Thing Modal */}
      <Modal
        open={createThingModalOpen}
        onClose={closeCreateThingModal}
        className={classes.modal}
        disableEnforceFocus
      >
        <CreateThingModal closeThingModal={closeCreateThingModal} />

      </Modal>
      {/* View Things Modal */}
      <Modal
        open={viewThingsModalOpen}
        onClose={closeViewThingsModal}
        className={classes.modal}
        disableEnforceFocus
      >
        <ViewThingsModal closeViewThingsModal={closeViewThingsModal} />
      </Modal>
    </ThemeProvider >
  );
}
