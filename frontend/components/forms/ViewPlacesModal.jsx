import React, { useState, useEffect } from "react"
import Container from '@material-ui/core/Container';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../helpers/axiosConfig'


const useStyles = makeStyles((theme) => ({
    input: {
        border: 'rgba(0,0,0,.2)'
    },
}));

export default function createPlaceModal() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axiosConfig.get('/get-places'); // Fetches all places

                setPlaces(response.data);

            } catch (error) {
                console.error('Failed to fetch places:', error);
            }
        };

        fetchPlaces();
    }, []);

    // Delete the following lines when done testing:
    useEffect(() => {
        console.log('Places:', places);
    }, [places]);
    // End delete

    return (
        <>
            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>VIEW PLACES</Typography>
                {places.map((place) => (
                    <Grid key={place.id}>
                        <Container style={{ backgroundColor: '#381e99', color: 'white', marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }} >
                            <Typography variant="h5" component="h2">{place.place_name}</Typography>
                            <Typography variant="body1" component="p" >Description: {place.physical_description}</Typography>
                            <Typography variant="body1" component="p" >Sovereign: {place.sovereign}</Typography>
                            <Typography variant="body1" component="p" >Image: {place.img_url}</Typography>
                        </Container>
                    </Grid>
                ))}
            </Container>
        </ >
    )
}