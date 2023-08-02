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

export default function AddPlaces({ onAddPlace, includedPlaces }) {
    const [places, setPlaces] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axiosConfig.get('/get-places');

                setPlaces(response.data);

            } catch (error) {
                console.error('Failed to fetch places:', error);
            }

        };
        fetchPlaces();
    }, []);

    const handleAddPlace = (place) => {
        onAddPlace(place);
        setIsVisible((prevVisibility) => ({
            ...prevVisibility,
            [place.id]: false,
        }));
    };

    const classes = useStyles();

    useEffect(() => {

        setIsVisible((prevVisibility) =>
            places.reduce(
                (prev, place) => ({ ...prev, [place.id]: true }),
                prevVisibility
            )
        );
    }, [places]);

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
                        VIEW PLACES
                    </Typography>
                    {places.map((place) =>
                        includedPlaces.some((includedPlace) => includedPlace.id === place.id) ? null : (
                            <Grid key={place.id}>
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
                                        {place.place_name}{' '}
                                    </Typography>
                                    <div className={classes.iconButtonsContainer}>
                                        <IconButton
                                            aria-label="delete"
                                            className={classes.iconButton}
                                            onClick={() => handleAddPlace(place)}
                                        >
                                            <AddIcon />
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
