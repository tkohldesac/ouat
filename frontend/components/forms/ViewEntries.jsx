import React, { useState, useEffect } from "react"
import Container from '@material-ui/core/Container';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import axiosConfig from '../../helpers/axiosConfig'
export default function EntryForm() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                console.log('fetching entries')
                const response = await axiosConfig.get('/get-adventures');
                setEntries(response.data)
            } catch (error) {
                console.error('Failed to fetch entries:', error);
            }
        };
        fetchEntries();
    }, []);


    return (
        <div>
            <Container style={{
                marginTop: '3rem',
                width: '75%',
                backgroundColor: '#f4a2fd',
                paddingTop: '2rem',
                paddingBottom: '2rem'

            }}>

                <Typography variant="h3" style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>The Story So Far</Typography>
                {entries.map((entry) => (
                    <Grid key={entry.id}>
                        <Container style={{ backgroundColor: '#381e99', color: 'white', marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }} >
                            <Typography variant="h5" component="h2">{entry.entry_title}</Typography>
                            <Typography variant="body1" component="p">{entry.entry_text}</Typography>

                        </Container>
                    </Grid>
                ))}

            </Container>
        </div>
    )
}