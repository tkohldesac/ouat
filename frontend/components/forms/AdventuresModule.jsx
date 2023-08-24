import React, { useState, useEffect } from 'react';
import { IconButton, Grid, Typography, Modal } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axiosConfig from '../../helpers/axiosConfig';
import EditAdventureModal from "./EditAdventureModal";

export default function AdventuresModule({ adventure,
    classes,
    id

}) {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedAdventureId, setSelectedAdventureId] = useState(null);
    const [adventureData, setAdventureData] = useState(null);

    const handleDelete = async (id) => {
        try {
            const deleteAdventure = await axiosConfig.delete('/delete-adventure', { data: { id } },

            );
            if (deleteAdventure.status >= 200 && deleteAdventure.status < 300) {
                console.log('Adventure Deleted!');
                const response = await axiosConfig.get('/get-adventures');
                setAdventures(response.data);
            }
        } catch (error) {
            console.error('Error deleting adventure:', error);
        }

    };

    const handleEdit = (id) => {
        setSelectedAdventureId(id);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedAdventureId(null);
        setEditModalOpen(false);
    };

    const fetchAdventure = async (id) => {
        try {
            const response = await axiosConfig.get('/get-adventure', {
                params: { id: id }

            });
            setAdventure(response.data);

        } catch (error) {
            console.error('Failed to fetch adventure:', error);
        }

    };


    useEffect(() => {
        if (id !== null) {
            fetchAdventure(id);
        }
    }, [id]);

    console.log(`${adventure.id}`)
    return (
        <div>
            <Grid key={adventure.id}>
                <Container style={{ backgroundColor: '#381e99', color: 'white', marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
                    <Typography variant="h5" component="h2">{adventure.adventure_title}</Typography>
                    <Typography variant="body1" component="p">{adventure.adventure_text}</Typography>
                    <div className={classes.iconButtonsContainer}>
                        <IconButton
                            aria-label="edit"
                            className={classes.iconButton}
                            onClick={() => handleEdit(adventure.id)}>
                            <EditIcon sx={{ color: 'white' }} />
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            className={classes.iconButton}
                            onClick={() => handleDelete(adventure.id)}>
                            <DeleteForeverIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </div>
                    <Modal
                        open={editModalOpen && selectedAdventureId !== null}
                        onClose={closeEditModal}
                        className={classes.modal}
                        disableEnforceFocus
                    >

                        {selectedAdventureId !== null && <EditAdventureModal adventureId={selectedAdventureId} />}
                    </Modal>
                </Container>
            </Grid>
        </div>
    )
}
