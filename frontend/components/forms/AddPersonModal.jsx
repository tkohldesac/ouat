import React, { useState, useEffect } from "react"
import Container from '@material-ui/core/Container';
import { IconButton, Grid, Typography } from '@material-ui/core';
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
        color: 'white',
        marginTop: '.4rem',
        marginBottom: '1rem',
    },

}));

export default function AddPeople({ onAddPerson, includedPeople }) {
    const [people, setPeople] = useState([]);
    const [isVisible, setIsVisible] = useState(true);



    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await axiosConfig.get('/get-people');

                setPeople(response.data);

            } catch (error) {
                console.error('Failed to fetch people:', error);
            }

        };
        fetchPeople();
    }, []);

    const handleAddPerson = (person) => {
        onAddPerson(person);
        setIsVisible((prevVisibility) => ({
            ...prevVisibility,
            [person.id]: false,
        }));
    };

    const classes = useStyles();

    useEffect(() => {

        setIsVisible((prevVisibility) =>
            people.reduce(
                (prev, person) => ({ ...prev, [person.id]: true }),
                prevVisibility
            )
        );
    }, [people]);

    return (
        <>
            <Container
                maxWidth="sm"
                style={{
                    backgroundColor: '#f4a2fd',
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                    overflow: 'auto',
                }}
            >
                <div>
                    <Typography
                        variant='h5'
                        style={{
                            paddingBottom: '1rem',
                            textAlign: 'center',
                            color: 'white',
                        }}
                    >
                        VIEW PEOPLE
                    </Typography>
                    {people.map((person) =>
                        includedPeople.some((includedPerson) => includedPerson.id === person.id) ? null : (
                            <Grid key={person.id}>
                                <Container
                                    style={{
                                        backgroundColor: 'darkred',
                                        color: 'black',
                                        marginBottom: '1rem',
                                        paddingTop: '1rem',
                                        paddingBottom: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        component="h5"
                                        style={{ flex: 1, justifyContent: 'center' }}
                                    >
                                        {person.person_name}{' '}
                                    </Typography>
                                    <div className={classes.iconButtonsContainer}>
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.iconButton}
                                            onClick={() => handleAddPerson(person)}
                                        >
                                            <AddIcon style={{ color: 'black' }} />
                                        </IconButton>
                                    </div>
                                </Container>
                            </Grid>
                        )
                    )}
                </div>
            </Container>
        </>
    );
}
