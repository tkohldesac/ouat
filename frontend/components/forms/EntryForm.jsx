import React from "react"
import Container from '@material-ui/core/Container';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import axiosConfig from "../../helpers/axiosConfig"

export default function EntryForm() {

    const [entryTitle, setEntryTitle] = React.useState('');
    const [entryText, setEntryText] = React.useState('');
    

    const handleEntryTitleChange = (event) => {
        setEntryTitle(event.target.value);
    };
    const handleEntryTextChange = (event) => {
        setEntryText(event.target.value);
    };

    const handleSubmit = async (event) => {
        try {
            const response = await axiosConfig.post(
                '/create-adventure',
                {
                    entryTitle,
                    entryText,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                console.log('New adventure logged!');
            }
        } catch (error) {
            console.error('Error creating new adventure:', error);
        }
    };


    return (
        <div>
            <Container style={{
                marginTop: '3rem',
                width: '75%',
                backgroundColor: '#f4a2fd',
                paddingTop: '2rem',
                paddingBottom: '2rem'

            }}>

                <Typography variant="h3" style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>Record Your Adventure</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >

                            <TextField
                                required
                                fullWidth
                                label="Adventure Title"
                                name="adventureTitle"
                                variant="filled"
                                center={true.toString}
                                value={entryTitle}
                                onChange={handleEntryTitleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Adventure Text"
                                name="adventureText"
                                variant="filled"
                                multiline
                                minRows={4}
                                value={entryText}
                                onChange={handleEntryTextChange}
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
        </div>
    )
}