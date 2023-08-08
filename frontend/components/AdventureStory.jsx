import React from "react"
import Container from '@material-ui/core/Container';
import ViewAdventures from '../components/forms/ViewAdventures'

export default function AdventureEntry() {

    return (
        <div>
            <Container style={{
                paddingTop: '.1rem',
                backgroundColor: '#381e99',
                minHeight: '120%',
                paddingBottom: '3rem'
            }}>
                <ViewAdventures />
            </Container>

        </div>
    )
}