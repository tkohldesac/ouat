
import React, { useEffect, useState } from "react"
import Container from '@material-ui/core/Container';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import axiosConfig from "../../helpers/axiosConfig"

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
        flex: "1 1 100%",
        margin: theme.spacing(1),
    },
    cardHead: {
        textAlign: 'center'
    },
    chip: {
        marginLeft: '1rem',
        marginRight: '.5rem',
        marginBottom: '1rem'
    }
}));

export default function EditPlaceModal({ placeId }) {
    const [placeName, setPlaceName] = React.useState('');
    const [placeDescription, setPlaceDescription] = React.useState('');
    const [placeSovereign, setPlaceSovereign] = React.useState('');
    const [placeImageUrl, setPlaceImageUrl] = React.useState('');

    const [placeData, setPlaceData] = React.useState([]);

    const fetchPlace = async () => {
        try {
            console.log(`Getting placeId: ${placeId}`);
            const response = await axiosConfig.get(`/get-place/${placeId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Got place successfully!');
                setPlaceData(response.data);

            }
        } catch (error) {
            console.error('Error getting place:', error);
        }
    };

    useEffect(() => {
        if (placeId !== null) {
            fetchPlace(placeId);
        }
    }, [placeId]);


    useEffect(() => {
        if (placeData.place_name) {
            setPlaceName(placeData.place_name);
            setPlaceDescription(placeData.physical_description);
            setPlaceSovereign(placeData.sovereign)
            setPlaceImageUrl(placeData.img_url);
        }
    }, [placeData]);


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

    const editPlace = async (event) => {
        try {
            const response = await axiosConfig.put(
                '/update-place',
                {
                    placeId,
                    placeName,
                    placeDescription,
                    placeSovereign,
                    placeImageUrl,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                console.log('Updated place successfully!');
            }
        } catch (error) {
            console.error('Error updating place:', error);
        }

    };

    return (
        <div>
            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>Create a Place</Typography>
                <form >
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
                            <Button 
                            onClick={editPlace}
                            variant="contained" 
                            color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div >
    )
}