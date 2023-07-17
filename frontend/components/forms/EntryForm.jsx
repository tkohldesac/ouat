import React from "react"
import Container from '@material-ui/core/Container';
import { TextField, Button, Grid, Typography } from '@material-ui/core';

export default function EntryForm() {

    const handleSubmit = () => {
        console.log('Submitted!')
    }

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
                                center
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
                                rows={4}
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