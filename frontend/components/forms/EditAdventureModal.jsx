import React, { useEffect } from "react"
import Container from '@material-ui/core/Container';
import { TextField, Button, Grid, Typography, Card, CardContent, Modal, Chip } from '@material-ui/core';
import axiosConfig from "../../helpers/axiosConfig"
import AddIcon from '@mui/icons-material/Add';
import AddPersonModal from './AddPersonModal'
import AddPlaceModal from './AddPlaceModal'
import AddThingModal from './AddThingModal'
import { makeStyles } from '@material-ui/core/styles';

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
        maxWidth: '600px',
    },
    cardContainer: {
        display: "flex",
        justifyContent: "space-between",

    },
    card: {
        flex: "1 1 100%",
        margin: theme.spacing(1),
    },
    cardHead: {
        textAlign: 'center'
    },
    chip: {
        marginLeft: '1rem',
        marginRight: '.5rem',
        marginBottom: '1rem'
    }
}));

export default function EditAdventureModal({ adventureId, closeEditModal }) {
    const [adventureTitle, setAdventureTitle] = React.useState('');
    const [adventureText, setAdventureText] = React.useState('');
    const [includedPeople, setIncludedPeople] = React.useState([]);
    const [includedPlaces, setIncludedPlaces] = React.useState([]);
    const [includedThings, setIncludedThings] = React.useState([]);
    const [adventure, setAdventure] = React.useState([]);

    const newInt = parseInt(adventureId)

    const fetchAdventure = async (newInt) => {
        try {
            const response = await axiosConfig.get('/get-adventure', {
                params: { id: newInt }

            });
            setAdventure(response.data);

        } catch (error) {
            console.error('Failed to fetch adventure:', error);
        }

    };

    useEffect(() => {
        if (adventureId !== null) {
            fetchAdventure(adventureId);
        }
    }, [adventureId]);

    useEffect(() => {
        if (adventure.adventure) {
            setAdventureText(adventure.adventure.adventure_text);
            setAdventureTitle(adventure.adventure.adventure_title);
            setIncludedPeople(adventure.peopleData);
            setIncludedPlaces(adventure.placesData);
            setIncludedThings(adventure.thingsData);
        }
    }, [adventure]);

    const handleAddPerson = (person) => {
        setIncludedPeople((prevPeople) => [...prevPeople, person]);
    };
    const handleAddPlace = (place) => {
        setIncludedPlaces((prevPlaces) => [...prevPlaces, place]);
    };
    const handleAddThing = (thing) => {
        setIncludedThings((prevThings) => [...prevThings, thing]);
    };


    const [addPersonModalOpen, setAddPersonModalOpen] = React.useState(false);
    const [addPlaceModalOpen, setAddPlaceModalOpen] = React.useState(false);
    const [addThingModalOpen, setAddThingModalOpen] = React.useState(false);

    const openAddPerson = () => setAddPersonModalOpen(true);
    const closeAddPerson = () => setAddPersonModalOpen(false);

    const openAddPlace = () => setAddPlaceModalOpen(true);
    const closeAddPlace = () => setAddPlaceModalOpen(false);

    const openAddThing = () => setAddThingModalOpen(true);
    const closeAddThing = () => setAddThingModalOpen(false);


    const handleAdventureTitleChange = (event) => {
        setAdventureTitle(event.target.value);
    };
    const handleAdventureTextChange = (event) => {
        setAdventureText(event.target.value);
    };

    const handleDeletePeople = (id) => {
        setIncludedPeople((prevPeople) => prevPeople.filter((person) => person.id !== id));
    };
    const handleDeletePlaces = (id) => {
        setIncludedPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== id));
    };
    const handleDeleteThings = (id) => {
        setIncludedThings((prevThings) => prevThings.filter((thing) => thing.id !== id));
    };

    const handleSubmit = async (event) => {
        try {
            const response = await axiosConfig.put(
                '/update-adventure',
                {
                    adventureId,
                    adventureTitle,
                    adventureText,
                    includedPeople,
                    includedPlaces,
                    includedThings
                },

                {
                    headers: {
                        'Content-Type': 'application/json',

                    },
                }

            );

            closeEditModal();
            if (response.ok) {
                console.log('New adventure logged!');
            }
        } catch (error) {
            console.error('Error creating new adventure:', error);
        }
    };
    const classes = useStyles();
    return (

        <>
            <Container style={{
                backgroundColor: '#f4a2fd',
                paddingBottom: '2rem',
                paddingTop: '2rem'
            }}>
                <Typography variant="h5" style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>Edit Your Adventure</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                            required
                            fullWidth
                            label="Adventure Title"
                            name="adventureTitle"
                            variant="filled"
                            center={true.toString}
                            value={adventureTitle}
                            onChange={handleAdventureTitleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Adventure Text"
                            name="adventureText"
                            variant="filled"
                            multiline
                            minRows={4}
                            value={adventureText}
                            onChange={handleAdventureTextChange}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ flexGrow: 1 }} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                        <Grid xs={12} style={{ textAlign: 'center' }}  >
                            <Button variant="contained" startIcon={<AddIcon />} onClick={openAddPerson} >People</Button>
                            <Modal
                                open={addPersonModalOpen}
                                onClose={closeAddPerson}
                                disableEnforceFocus
                                className={classes.modal}
                            >
                                <AddPersonModal onAddPerson={handleAddPerson}
                                    includedPeople={includedPeople} />
                            </Modal>
                        </Grid>
                        <Grid xs={12} style={{ textAlign: 'center' }} >
                            <Button variant="contained" startIcon={<AddIcon />} onClick={openAddPlace} >Places</Button>
                            <Modal
                                open={addPlaceModalOpen}
                                onClose={closeAddPlace}
                                className={classes.modal}
                                disableEnforceFocus>
                                <AddPlaceModal onAddPlace={handleAddPlace}
                                    includedPlaces={includedPlaces} />

                            </Modal>
                        </Grid>
                        <Grid xs={12} style={{ textAlign: 'center' }}>
                            <Button variant="contained" startIcon={<AddIcon />} onClick={openAddThing}>Things</Button>
                            <Modal
                                open={addThingModalOpen}
                                onClose={closeAddThing}
                                className={classes.modal}
                                disableEnforceFocus>
                                <AddThingModal onAddThing={handleAddThing}
                                    includedThings={includedThings} />
                            </Modal>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container className={classes.root}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardHead}>
                                    <Typography>PEOPLE</Typography>
                                </CardContent>
                                {includedPeople.map((person) => (
                                    <Chip
                                        key={person.id}
                                        label={person.person_name}
                                        color='primary'
                                        className={classes.chip}
                                        onDelete={() => handleDeletePeople(person.id)}
                                    />
                                ))}
                            </Card>
                            <Card className={classes.card} >
                                <CardContent className={classes.cardHead}>
                                    <Typography>PLACES</Typography>
                                </CardContent>
                                {includedPlaces.map((place) => (
                                    <Chip
                                        key={place.id}
                                        label={place.place_name}
                                        color='primary'
                                        className={classes.chip}
                                        onDelete={() => handleDeletePlaces(place.id)}
                                    />
                                ))}
                            </Card>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardHead}>
                                    <Typography>THINGS</Typography>
                                </CardContent>
                                {includedThings.map((thing) => (
                                    <Chip
                                        key={thing.id}
                                        label={thing.thing_name}
                                        color='primary'
                                        className={classes.chip}
                                        onDelete={() => handleDeleteThings(thing.id)}
                                    />
                                ))}
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                        >
                            Re-Record
                        </Button>
                    </Grid>
                </Grid>

            </Container >
        </ >
    )
}