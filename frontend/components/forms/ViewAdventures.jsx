import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import { IconButton, Grid, Typography, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../helpers/axiosConfig';
import EditAdventureModal from "./EditAdventureModal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
        width: '50%',
        overflow: 'auto'

    },
}));

const fetchAdventures = async () => {
    try {
        const response = await axiosConfig.get('/get-adventures');
        setAdventures(response.data);
    } catch (error) {
        console.error('Failed to fetch adventures:', error);
    }
};

export default function AdventureForm() {
    const [adventures, setAdventures] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedAdventureId, setSelectedAdventureId] = useState(null);



    useEffect(() => {
        const fetchAdventures = async () => {
            try {
                const response = await axiosConfig.get('/get-adventures');
                setAdventures(response.data);
            } catch (error) {
                console.error('Failed to fetch adventures:', error);
            }
        };
        fetchAdventures();
    }, []);

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
    const classes = useStyles();

    return (
        <div>
            <Container style={{
                marginTop: '3rem',
                width: '75%',
                backgroundColor: '#f4a2fd',
                paddingTop: '2rem',
                paddingBottom: '2rem',
            }}>
                <Typography variant="h3" style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>The Story So Far</Typography>
                {adventures.map((adventure) => (
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
                        </Container>
                    </Grid>
                ))}
                <Modal
                    open={editModalOpen && selectedAdventureId !== null}
                    onClose={closeEditModal}
                    className={classes.modal}
                    disableEnforceFocus
                >

                    {selectedAdventureId !== null && <EditAdventureModal adventureId={selectedAdventureId} />}
                </Modal>
            </Container>
        </div>
    );

}