import React, { useState, useEffect } from "react"
import Container from '@material-ui/core/Container';
import { IconButton, Grid, Typography, Modal, Image } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../helpers/axiosConfig'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditPersonModal from "./EditPersonModal";

const useStyles = makeStyles((theme) => ({
    input: {
        border: 'rgba(0,0,0,.2)'
    },
    iconButtonsContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '1rem',
    },
    iconButton: {
        bottom: '0',
        right: '0',
    },
    modal: {
        margin: 'auto',
        marginTop: '5%',
    },
}));


export default function createPersonModal(closeViewPlaceModal) {
    const [people, setPeople] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedPersonId, setSelectedPersonId] = useState(null);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const response = await axiosConfig.get('/get-people');

                setPeople(response.data);

            } catch (error) {
                console.error('Failed to fetch people:', error);
            }

        };
        fetchPeople();
    }, []);

    const classes = useStyles();

    const handleDelete = async (id) => {
        try {
            const deletePerson = await axiosConfig.delete('/delete-person', { data: { id } },

            );
            if (deletePerson.status >= 200 && deletePerson.status < 300) {
                console.log('Person Deleted!');
                const response = await axiosConfig.get('/get-people');
                setPeople(response.data);
            }
        } catch (error) {
            console.error('Error deleting person:', error);
        }
    };

    const handleEdit = (id) => {
        setSelectedPersonId(id);
        setEditModalOpen(true);
    };
    const closeEditModal = () => {
        setSelectedPersonId(null);
        setEditModalOpen(false);
        fetchPeople();
    };


    return (
        <>
            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}
                sx={{ overflow: 'auto' }}
            >
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }} >VIEW PEOPLE</Typography>
                {people.map((person) => (
                    <Grid key={person.id}>
                        {console.log(person)}
                        <Container style={{ backgroundColor: '#381e99', color: 'white', marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }} >
                            <Typography variant="h5" component="h2" >{person.person_name} </Typography>
                            <Typography variant="body1" component="p" >Age: {person.age}</Typography>
                            <Typography variant="body1" component="p" >Physical Description: {person.physical_description}</Typography>
                            <Typography variant="body1" component="p" >Spell/Abilities: {person.spells_abilities}</Typography>
                            <Typography variant="body1" component="p" >Bio: {person.bio}</Typography>
                            {console.log(person.img_url)}
                            <img alt="Image" src={person.image_url}></img>
                            <div className={classes.iconButtonsContainer}>
                                <IconButton
                                    aria-label="delete"
                                    className={classes.iconButton}
                                    onClick={() => handleEdit(person.id)}>
                                    <EditIcon sx={{ color: 'white' }} />
                                </IconButton>
                                <IconButton aria-label="delete" className={classes.iconButton} onClick={() => handleDelete(person.id)}>
                                    <DeleteForeverIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </div>
                        </Container>
                    </Grid>
                ))}
                <Modal
                    open={editModalOpen && selectedPersonId !== null}
                    onClose={closeEditModal}
                    className={classes.modal}
                    disableEnforceFocus
                >
                    {selectedPersonId !== null && <EditPersonModal closeEditModal={closeEditModal} personId={selectedPersonId} />}
                </Modal>
            </Container>
        </>
    )

}