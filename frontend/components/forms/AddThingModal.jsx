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

export default function AddThings({ onAddThing }) {
    const [things, setThings] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchThings = async () => {
            try {
                const response = await axiosConfig.get('/get-things'); // Fetches all things

                setThings(response.data);

            } catch (error) {
                console.error('Failed to fetch things:', error);
            }

        };
        fetchThings();
    }, []);

    const handleAddThing = (thing) => {
        onAddThing(thing);
        console.log(`Thing added: ${thing.thing_name}`)
        setIsVisible((prevVisibility) => ({
            ...prevVisibility,
            [thing.id]: false,
        }));
    };

    const classes = useStyles();

    useEffect(() => {

        setIsVisible((prevVisibility) =>
            things.reduce(
                (prev, thing) => ({ ...prev, [thing.id]: true }),
                prevVisibility
            )
        );
    }, [things]);

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
                        VIEW THINGS
                    </Typography>
                    {things.map((thing) =>
                        isVisible[thing.id] ? ( // Check if the thing entry is visible
                            <Grid key={thing.id}>
                                <Container
                                    style={{
                                        backgroundColor: 'darkred',
                                        color: 'white',
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
                                        {thing.thing_name}{' '}
                                    </Typography>
                                    <div className={classes.iconButtonsContainer}>
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.iconButton}
                                            onClick={() => handleAddThing(thing)}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                </Container>
                            </Grid>
                        ) : null
                    )}
                </div>
            </Container>
        </>
    );
}
