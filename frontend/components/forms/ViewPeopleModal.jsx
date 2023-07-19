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
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await axiosConfig.get('/get-people'); // Fetches all people

                setPeople(response.data);
                console.log(response.data.forEach(person => {
                    console.log('Name:', person.person_name)
                    console.log('Name:', person.age)
                }));

            } catch (error) {
                console.error('Failed to fetch people:', error);
            }
        };

        fetchPeople();
    }, []);


    const classes = useStyles();

    const handleSubmit = () => {
        console.log('submit')
    }
    return (
        <div>

            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>VIEW PEOPLE</Typography>

            </Container>
        </div >
    )
}