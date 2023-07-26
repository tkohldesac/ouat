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
}));

export default function EntryForm() {
    // Entry items:
    const [entryTitle, setEntryTitle] = React.useState('');
    const [entryText, setEntryText] = React.useState('');
    const [includedPeople, setIncludedPeople] = React.useState([]);
    const [includedPlaces, setIncludedPlaces] = React.useState([]);
    const [includedThings, setIncludedThings] = React.useState([]);
    // End Entry items //

    const handleAddPerson = (person) => {
        setIncludedPeople((prevPeople) => [...prevPeople, person]);
    };
    const handleAddPlace = (place) => {
        setIncludedPlaces((prevPlaces) => [...prevPlaces, place]);
    };
    const handleAddThing = (thing) => {
        setIncludedThings((prevThings) => [...prevThings, thing]);
    };


    // Modal fun:

    // Modal state:
    const [addPersonModalOpen, setAddPersonModalOpen] = React.useState(false);
    const [addPlaceModalOpen, setAddPlaceModalOpen] = React.useState(false);
    const [addThingModalOpen, setAddThingModalOpen] = React.useState(false);

    const openAddPerson = () => setAddPersonModalOpen(true);
    const closeAddPerson = () => setAddPersonModalOpen(false);

    const openAddPlace = () => setAddPlaceModalOpen(true);
    const closeAddPlace = () => setAddPlaceModalOpen(false);

    const openAddThing = () => setAddThingModalOpen(true);
    const closeAddThing = () => setAddThingModalOpen(false);


    const handleEntryTitleChange = (event) => {
        setEntryTitle(event.target.value);
    };
    const handleEntryTextChange = (event) => {
        setEntryText(event.target.value);
    };

    useEffect(() => {
        console.log(`includedPeople:`)
        includedPeople.forEach(person => console.log(person.person_name));
    }, [includedPeople]);

    useEffect(() => {
        console.log(`includedPlaces:`)
        includedPlaces.forEach(place => console.log(place.place_name));
    }, [includedPlaces]);

    useEffect(() => {
        console.log(`includedThings:`)
        includedThings.forEach(thing => console.log(thing.thing_name));
    }, [includedThings]);


    const handleSubmit = async (event) => {
        try {
            const response = await axiosConfig.post(
                '/create-adventure',
                {
                    entryTitle,
                    entryText,
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
                                value={entryTitle}
                                onChange={handleEntryTitleChange}
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
                                value={entryText}
                                onChange={handleEntryTextChange}
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
                                    <AddPersonModal onAddPerson={handleAddPerson} />
                                </Modal>
                            </Grid>
                            <Grid xs={4} style={{ textAlign: 'center' }} >
                                <Button variant="contained" startIcon={<AddIcon />} onClick={openAddPlace} >Places</Button>
                                <Modal
                                    open={addPlaceModalOpen}
                                    onClose={closeAddPlace}
                                    className={classes.modal}
                                    disableEnforceFocus>
                                    <AddPlaceModal onAddPlace={handleAddPlace} />

                                </Modal>
                            </Grid>
                            <Grid xs={4} style={{ textAlign: 'center' }}>
                                <Button variant="contained" startIcon={<AddIcon />} onClick={openAddThing}>Things</Button>
                                <Modal
                                    open={addThingModalOpen}
                                    onClose={closeAddThing}
                                    className={classes.modal}
                                    disableEnforceFocus>
                                    <AddThingModal onAddThing={handleAddThing} />
                                </Modal>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className={classes.root}>
                                <Card className={classes.card}>
                                    <CardContent>People</CardContent>
                                    {includedPeople.map((includedPeople) => (
                                        <Chip key={includedPeople.id} label={includedPeople.person_name} color='primary' />
                                    ))}
                                </Card>
                                <Card className={classes.card}>
                                    <CardContent>Places</CardContent>
                                    {includedPlaces.map((includedPlaces) => (
                                        <Chip key={includedPlaces.id} label={includedPlaces.place_name} color='secondary' />
                                    ))}
                                </Card>
                                <Card className={classes.card}>
                                    <CardContent>Things</CardContent>
                                    {includedThings.map((includedThings) => (
                                        <Chip key={includedThings.id} label={includedThings.thing_name} color='primary' />
                                    ))}
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Record
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Container >
        </ >
    )
}