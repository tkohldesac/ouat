import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';

export default function AddPeople() {

    const [people, setPeople] = useState([]);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await axiosConfig.get('/get-people'); // Fetches all people

                setPeople(response.data);

            } catch (error) {
                console.error('Failed to fetch people:', error);
            }

        };
        fetchPeople();
    }, []);

    return (
        <div>
            <Container>
                Test1
            </Container>
        </div>
    )
}
