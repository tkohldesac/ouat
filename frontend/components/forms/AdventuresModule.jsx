import React, { useState, useEffect } from 'react';
import { IconButton, Grid, Typography, Modal } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditAdventureModal from "./EditAdventureModal";

export default function AdventuresModule({ adventure,
    classes,
    handleDelete,
    
}) {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedAdventureId, setSelectedAdventureId] = useState(null);
    
    const handleEdit = (id) => {
        setSelectedAdventureId(id);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedAdventureId(null);
        setEditModalOpen(false);
        
    };

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

                        {selectedAdventureId !== null ? 
                        <EditAdventureModal 
                        adventureId={selectedAdventureId} 
                        closeEditModal={closeEditModal}
                        /> : null}
                        
                    </Modal>
                </Container>
            </Grid>
        </div>
    )
}
