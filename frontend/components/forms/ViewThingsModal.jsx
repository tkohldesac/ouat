import React, { useState, useEffect } from "react"
import Container from '@material-ui/core/Container';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../helpers/axiosConfig'



const useStyles = makeStyles((theme) => ({
    input: {
        border: 'rgba(0,0,0,.2)'
    },
}));

export default function createPersonModal() {

    const classes = useStyles();

    const handleSubmit = () => {
        console.log('submit')
    }

    const [things, setThings] = useState([]);

    useEffect(() => {
        const fetchThings = async () => {
            try {
                const response = await axiosConfig.get('/get-things'); // Fetches all things

                setThings(response.data);

            } catch (error) {
                console.error('Failed to fetch things:', error);
            }
        };

        fetchThings();
    }, []);

    useEffect(() => {
        console.log('Things:', things);
    }, [things]);


    return (
        <div>

            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>VIEW THINGS</Typography>

            </Container>
        </div >
    )
}