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

export default function createPersonModal() {
    const [things, setThings] = useState([]);

    useEffect(() => {
        const fetchThings = async () => {
            try {
                const response = await axiosConfig.get('/get-things');

                setThings(response.data);

            } catch (error) {
                console.error('Failed to fetch things:', error);
            }
        };
        fetchThings();
    }, []);

    return (
        <>
            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>VIEW THINGS</Typography>
                {things.map((thing) => (
                    <Grid key={thing.id}>
                        <Container style={{ backgroundColor: '#381e99', color: 'white', marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }} >
                            <Typography variant="h5" component="h2">{thing.thing_name}</Typography>
                            <Typography variant="body1" component="p">{thing.physical_description}</Typography>
                            <Typography variant="body1" component="p">{thing.special_properties}</Typography>
                            <Typography variant="body1" component="hp">{thing.img_url}</Typography>
                        </Container>
                    </Grid>
                ))}
            </Container>
        </ >
    )
}