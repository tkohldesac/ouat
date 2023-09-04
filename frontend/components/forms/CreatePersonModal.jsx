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

export default function createPersonModal(closeModal) {

    const [personName, setPersonName] = React.useState('');
    const [personAge, setPersonAge] = React.useState('');
    const [personDescription, setPersonDescription] = React.useState('');
    const [personAbilities, setPersonAbilities] = React.useState('');
    const [personBio, setPersonBio] = React.useState('');
    const [personImageUrl, setPersonImageUrl] = React.useState('');

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

    const createPlace = async (event) => {
        try {
            const response = await axiosConfig.post(
                '/create-people',
                {
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
            closeModal();
            if (response.ok) {
                console.log('New person created successfully!');
            }
        } catch (error) {
            console.error('Error creating new person:', error);
        }

    };

    return (
        <div>

            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>Create a Person</Typography>
                <form >
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
                            <Button
                                onClick={createPlace}
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