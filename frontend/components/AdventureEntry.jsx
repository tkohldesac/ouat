import React from "react"
import Container from '@material-ui/core/Container';
import AdventureForm from "./forms/AdventureForm";

export default function AdventureEntry() {

    return (
        <div>
            <Container style={{
                paddingTop: '.1rem',
                backgroundColor: '#381e99',
                height: '80vh'
            }}>
                <AdventureForm />

            </Container>
        </div>
    )
}