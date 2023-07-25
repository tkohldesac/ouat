import React, { useState, useEffect } from "react"
import Container from '@material-ui/core/Container';
import { IconButton, Grid, Typography, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../helpers/axiosConfig'
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles((theme) => ({
    input: {
        border: 'rgba(0,0,0,.2)'
    },
    iconButtonsContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '1rem',
    },
    iconButton: {
        bottom: '0',
        right: '0',
    },

}));

export default function AddPeople(onAddItem) {

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
            <Container maxWidth="sm"
                style={{
                    backgroundColor: '#f4a2fd',
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                    overflow: 'auto',

                }} >
                <div>
                    <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }} >VIEW PEOPLE</Typography>
                    {people.map((person) => (
                        <Grid key={person.id} >


                            <Container style={{ backgroundColor: '#381e99', color: 'white', marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }} >

                                <Typography variant="h5" component="h5" >{person.person_name} </Typography>
                                <div className={classes.iconButtonsContainer}>
                                    <IconButton aria-label="delete" className={classes.iconButton}>
                                        <AddIcon />
                                    </IconButton>
                                </div>


                            </Container>
                        </Grid>
                    ))}
                </div>
            </Container >
        </>
    )
}
