
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

export default function EditPersonModal({ personId }) {
    const [personName, setPersonName] = React.useState('');
    const [personAge, setPersonAge] = React.useState('');
    const [personDescription, setPersonDescription] = React.useState('');
    const [personAbilities, setPersonAbilities] = React.useState('');
    const [personBio, setPersonBio] = React.useState('');
    const [personImageUrl, setPersonImageUrl] = React.useState('');
    
    const [personData, setPersonData] = React.useState([]);

    const fetchPerson = async () => {
        try {
            console.log(`Getting personId: ${personId}`);
            const response = await axiosConfig.get(`/get-person/${personId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Got person successfully!');
                setPersonData(response.data);
                console.log(response.data.person_name);
            }
        } catch (error) {
            console.error('Error getting person:', error);
        }
    };

    useEffect(() => {
        if (personId !== null) {
            fetchPerson(personId);
        }
    }, [personId]);


    useEffect(() => {
        if (personData.person_name) {
            setPersonName(personData.person_name);
            setPersonAge(personData.age);
            setPersonDescription(personData.physical_description);
            setPersonAbilities(personData.spells_abilities);
            setPersonBio(personData.bio);
            setPersonImageUrl(personData.image_url);


        }
    }, [personData]);


    const handlePersonNameChange = (event) => {
        setPersonName(event.target.value);
    };
    const handlePersonAgeChange = (event) => {
        setPersonAge(event.target.value);
    };
    const handlePersonDescriptionChange = (event) => {
        setPersonDescription(event.target.value);
    };
    const handlePersonAbilitiesChange = (event) => {
        setPersonAbilities(event.target.value);
    };
    const handlePersonBioChange = (event) => {
        setPersonBio(event.target.value);
    };
    const handlePersonImageUrlChange = (event) => {
        setPersonImageUrl(event.target.value);
    };

    const classes = useStyles();

    const handleSubmit = async (event) => {
        try {
            const response = await axiosConfig.put(
                '/update-person',
                {
                    personId,
                    personName,
                    personAge,
                    personDescription,
                    personAbilities,
                    personBio,
                    personImageUrl,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                console.log('Person person successfully!');
            }
        } catch (error) {
            console.error('Error updating person:', error);
        }

    };

    return (
        <div>
            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>Create a Person</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Character Name"
                                name="characterName"
                                variant="filled"
                                value={personName}
                                onChange={handlePersonNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Age"
                                name="age"
                                type="age"
                                variant="filled"
                                value={personAge}
                                onChange={handlePersonAgeChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Physical Description"
                                name="characterPhysicalDescription"
                                variant="filled"
                                multiline
                                minRows={4}
                                value={personDescription}
                                onChange={handlePersonDescriptionChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Spells & Abilities"
                                name="spellsAbilities"
                                multiline
                                minRows={4}
                                variant="filled"
                                value={personAbilities}
                                onChange={handlePersonAbilitiesChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Bio"
                                name="bio"
                                multiline
                                minRows={4}
                                variant="filled"
                                value={personBio}
                                onChange={handlePersonBioChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Image URL"
                                name="characterImageUrl"
                                variant="filled"
                                value={personImageUrl}
                                onChange={handlePersonImageUrlChange}
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