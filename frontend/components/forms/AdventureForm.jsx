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
        width: 400,
        overflow: 'auto'
    },
    cardContainer: {
        display: "flex",
        justifyContent: "space-between",

    },
    card: {
        flex: "1 1 30%",
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

export default function AdventureForm() {

    const [adventureTitle, setAdventureTitle] = React.useState('');
    const [adventureText, setAdventureText] = React.useState('');
    const [includedPeople, setIncludedPeople] = React.useState([]);
    const [includedPlaces, setIncludedPlaces] = React.useState([]);
    const [includedThings, setIncludedThings] = React.useState([]);


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
            const response = await axiosConfig.post(
                '/create-adventure',
                {
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
                marginTop: '3rem',
                width: '75%',
                backgroundColor: '#f4a2fd',
                paddingTop: '2rem',
                paddingBottom: '2rem',
            }}>
                <Typography variant="h3" style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>Record Your Adventure</Typography>
                <form onSubmit={handleSubmit}>
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
                            <Grid xs={4} style={{ textAlign: 'center' }} >
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
                            <Grid xs={4} style={{ textAlign: 'center' }} >
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
                            <Grid xs={4} style={{ textAlign: 'center' }}>
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
                                <Card className={classes.card}>
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
                                type="submit"
                                variant="contained"
                                color="primary">
                                Record
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Container >
        </ >
    )
}