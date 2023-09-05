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

export default function createThingModal(closeCreateThingModal) {

    const [thingName, setThingName] = React.useState('');
    const [thingDescription, setThingDescription] = React.useState('');
    const [thingProperties, setThingProperties] = React.useState('');
    const [thingImageUrl, setThingImageUrl] = React.useState('');

    const handleThingNameChange = (event) => {
        setThingName(event.target.value);
    }
    const handleThingDescriptionChange = (event) => {
        setThingDescription(event.target.value);
    }
    const handleThingPropertiesChange = (event) => {
        setThingProperties(event.target.value);
    }
    const handleThingImageUrlChange = (event) => {
        setThingImageUrl(event.target.value);
    }

    const classes = useStyles();

    const createThing = async (event) => {
        try {
            const response = await axiosConfig.post(
                '/create-thing',
                {
                    thingName,
                    thingDescription,
                    thingProperties,
                    thingImageUrl
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            closeCreateThingModal();
            if (response.ok) {
                console.log('New place created successfully!');
            }
        } catch (error) {
            console.error('Error creating new place:', error);
        }
    }
    return (
        <div>
            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>Create a Thing</Typography>
                <form >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Item Name"
                                name="itemName"
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
                                name="itemDescription"
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
                                label="Special Properties"
                                name="placeName"
                                variant="filled"
                                multiline
                                minRows={4}
                                value={thingProperties}
                                onChange={handleThingPropertiesChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Image URL"
                                name="placeImageUrl"
                                variant="filled"
                                value={thingImageUrl}
                                onChange={handleThingImageUrlChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={createThing}
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