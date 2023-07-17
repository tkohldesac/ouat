import React from "react"
import Container from '@material-ui/core/Container';
import ViewEntries from '../components/forms/ViewEntries'

export default function AdventureEntry() {

    return (
        <div>
            <Container style={{
                paddingTop: '3rem',
                backgroundColor: '#381e99',
                height: '100vh'
            }}>
                <ViewEntries />
            </Container>

        </div>
    )
}