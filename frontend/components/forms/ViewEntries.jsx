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

                <Typography variant="h3" style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>The Story So Far:</Typography>


            </Container>
        </div>
    )
}