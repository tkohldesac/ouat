import React from 'react';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


export default function AboutPage() {
    return (
        <div>
            <Container style={{
                paddingTop: '.1rem',
                backgroundColor: '#381e99',
                minHeight: '120%',
                paddingBottom: '3rem'
            }}>
                <Container style={{
                    marginTop: '3rem',
                    width: '75%',
                    backgroundColor: '#f4a2fd',
                    paddingTop: '2rem',
                    paddingBottom: '2rem',
                }}>
                    <Typography variant="h3" style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>About</Typography>
                    <Container style={{ backgroundColor: '#381e99', color: 'white', marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }}>


                        <Typography variant="p" style={{ fontSize: '1.4rem' }}>My oldest wanted to start reading books to my wife and I before bed time. She had frequently heard the phrases 'Once Upon A Time and A Long Time Ago, and decided to mash them together to create the phrase 'Once Upon A Time Ago...'. I wanted to start recording the stories my family came up with in a tabletop-RPG-like way. My thought was to create this lightweight CRUD app to keep track of all of the wacky things that happened and all the people, places and things that happened along the way. Maybe the kids will re-read the adventures here 20 years from now and find it interesting. Either way, I learned a lot and I'm happy with it. It's simple and serves my purposes. </Typography>
                    </Container>
                </Container>
            </Container>
        </div>
    )
}
