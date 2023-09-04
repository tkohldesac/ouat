import React from "react"
import Container from '@material-ui/core/Container';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from "../../helpers/axiosConfig"

const useStyles = makeStyles((theme) => ({
    input: {
        border: 'rgba(0,0,0,.2)'
    },
}));

export default function createPlacesModal() {

    const [placeName, setPlaceName] = React.useState('');
    const [placeDescription, setPlaceDescription] = React.useState('');
    const [placeSovereign, setPlaceSovereign] = React.useState('');
    const [placeImageUrl, setPlaceImageUrl] = React.useState('');

    const handlePlaceNameChange = (event) => {
        setPlaceName(event.target.value);
    };

    const handlePlaceDescriptionChange = (event) => {
        setPlaceDescription(event.target.value);
    };
    const handlePlaceSovereignChange = (event) => {
        setPlaceSovereign(event.target.value);
    };
    const handlePlaceImageUrlChange = (event) => {
        setPlaceImageUrl(event.target.value);
    };

    const classes = useStyles();

    const createPlace = async (event) => {
        try {
            const response = await axiosConfig.post(
                '/create-place',
                {
                    placeName,
                    placeDescription,
                    placeSovereign,
                    placeImageUrl
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                console.log('New place created successfully!');
            }
        } catch (error) {
            console.error('Error creating new place:', error);
        }
    };

    return (
        <div>
            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>Create a Place</Typography>
                <form onClick={createPlace}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Place Name"
                                name="placeName"
                                variant="filled"
                                value={placeName}
                                onChange={handlePlaceNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Description"
                                name="placeDescription"
                                variant="filled"
                                multiline
                                minRows={4}
                                value={placeDescription}
                                onChange={handlePlaceDescriptionChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Sovereign"
                                name="placeSovereign"
                                variant="filled"
                                value={placeSovereign}
                                onChange={handlePlaceSovereignChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Image URL"
                                name="placeImageUrl"
                                variant="filled"
                                value={placeImageUrl}
                                onChange={handlePlaceImageUrlChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div >
    )
}