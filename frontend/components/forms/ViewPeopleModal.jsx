import React, { useState, useEffect } from "react"
import Container from '@material-ui/core/Container';
import { TextField, Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../helpers/axiosConfig'


const useStyles = makeStyles((theme) => ({
    input: {
        border: 'rgba(0,0,0,.2)'
    },
}));

export default function createPersonModal() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await axiosConfig.get('/get-people'); // Fetches all people

                setPeople(response.data);

            } catch (error) {
                console.error('Failed to fetch people:', error);
            }

        };
        fetchPeople();
    }, []);

    const classes = useStyles();

    return (
        <>
            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }} sx={{ overflow: 'auto' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }} >VIEW PEOPLE</Typography>
                {people.map((person) => (
                    <Grid key={person.id}>
                        <Container style={{ backgroundColor: '#381e99', color: 'white', marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }} >
                            <Typography variant="h5" component="h2" >{person.person_name} </Typography>
                            <Typography variant="body1" component="p" >Age: {person.age}</Typography>
                            <Typography variant="body1" component="p" >Physical Description: {person.physical_description}</Typography>
                            <Typography variant="body1" component="p" >Spell/Abilities: {person.spells_abilities}</Typography>
                            <Typography variant="body1" component="p" >Bio: {person.bio}</Typography>
                            <Typography variant="body1" component="p" >Image: {person.image_url}</Typography>
                        </Container>
                    </Grid>
                ))}

            </Container>
        </>
    )

}