
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

export default function EditThingModal({ thingId }) {
    const [thingName, setThingName] = React.useState('');
    const [thingDescription, setThingDescription] = React.useState('');
    const [thingProperties, setThingProperties] = React.useState('');
    const [thingImageUrl, setThingImageUrl] = React.useState('');

    const [thingData, setThingData] = React.useState([]);


    const fetchThing = async () => {
        try {
            console.log(`Getting thingId: ${thingId}`);
            const response = await axiosConfig.get(`/get-thing/${thingId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Got thing successfully!');
                setThingData(response.data);

            }
        } catch (error) {
            console.error('Error getting thing:', error);
        }
    };

    useEffect(() => {
        if (thingId !== null) {
            fetchThing(thingId);
        }
    }, [thingId]);


    useEffect(() => {
        if (thingData.thing_name) {
            setThingName(thingData.thing_name);
            setThingDescription(thingData.physical_description);
            setThingProperties(thingData.special_properties)
            setThingImageUrl(thingData.img_url);
        }
    }, [thingData]);


    const handleThingNameChange = (event) => {
        setThingName(event.target.value);
    };

    const handleThingDescriptionChange = (event) => {
        setThingDescription(event.target.value);
    };

    const handleThingPropertiesChange = (event) => {
        setThingProperties(event.target.value);
    };

    const handleThingImageUrlChange = (event) => {
        setThingImageUrl(event.target.value);
    };

    const classes = useStyles();

    const handleSubmit = async (event) => {
        try {
            const response = await axiosConfig.put(
                '/update-thing',
                {
                    thingId,
                    thingName,
                    thingDescription,
                    thingProperties,
                    thingImageUrl,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                console.log('Updated thing successfully!');
            }
        } catch (error) {
            console.error('Error updating thing:', error);
        }

    };

    return (
        <div>
            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>Create a Thing</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Thing Name"
                                name="thingName"
                                variant="filled"
                                value={thingName}
                                onChange={handleThingNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Description"
                                name="thingDescription"
                                variant="filled"
                                multiline
                                minRows={4}
                                value={thingDescription}
                                onChange={handleThingDescriptionChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Properties"
                                name="thingProperties"
                                variant="filled"
                                value={thingProperties}
                                onChange={handleThingPropertiesChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Image URL"
                                name="thingImageUrl"
                                variant="filled"
                                value={thingImageUrl}
                                onChange={handleThingImageUrlChange}
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