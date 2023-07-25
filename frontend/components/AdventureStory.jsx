import React from "react"
import Container from '@material-ui/core/Container';
import ViewEntries from '../components/forms/ViewEntries'

export default function AdventureEntry() {

    return (
        <div>
            <Container style={{
                paddingTop: '.1rem',
                backgroundColor: '#381e99',
                minHeight: '100vh'
            }}>
                <ViewEntries />
            </Container>

        </div>
    )
}