import React from "react"
import Container from '@material-ui/core/Container';
import { TextField, Button, Grid, Typography, Box } from '@material-ui/core';
import axiosConfig from "../../helpers/axiosConfig"
import AddIcon from '@mui/icons-material/Add';

export default function EntryForm() {

    const [entryTitle, setEntryTitle] = React.useState('');
    const [entryText, setEntryText] = React.useState('');

    const [includedPeople, setIncludedPeople] = React.useState([]);
    const [includedPlaces, setIncludedPlaces] = React.useState([]);
    const [includedThings, setIncludedThings] = React.useState([]);


    const handleEntryTitleChange = (event) => {
        setEntryTitle(event.target.value);
    };
    const handleEntryTextChange = (event) => {
        setEntryText(event.target.value);
    };

    const handleIncludedPeopleEntry = (event) => {
        setIncludedPeople(event.target.value);
    };
    const handleIncludedPlacesEntry = (event) => {
        setIncludedPlaces(event.target.value);
    };
    const handleIncludedThingsEntry = (event) => {
        setIncludedThings(event.target.value);
    };


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


    return (
        <div>
            <Container style={{
                marginTop: '3rem',
                width: '75%',
                backgroundColor: '#f4a2fd',
                paddingTop: '2rem',
                paddingBottom: '2rem'

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
                        <Box sx={{ flexGrow: 1 }} style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                            <Grid container spacing={2}>
                                <Grid xs={4} style={{ textAlign: 'center' }} >
                                    <Button variant="contained" startIcon={<AddIcon />} >People</Button>
                                </Grid>
                                <Grid xs={4} style={{ textAlign: 'center' }}>
                                    <Button variant="contained" startIcon={<AddIcon />} >Places</Button>
                                </Grid>
                                <Grid xs={4} style={{ textAlign: 'center' }}>
                                    <Button variant="contained" startIcon={<AddIcon />} >Things</Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Record
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Container >
        </div >
    )
}