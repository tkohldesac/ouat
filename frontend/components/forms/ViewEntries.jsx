import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import { IconButton, Grid, Typography, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../helpers/axiosConfig';
import EditEntryModal from "./EditEntryModal";
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
        marginTop: '5%',
        width: 400,
    },
}));

const fetchEntries = async () => {
    try {
        const response = await axiosConfig.get('/get-adventures');
        setEntries(response.data);
    } catch (error) {
        console.error('Failed to fetch entries:', error);
    }
};

export default function EntryForm() {
    const [entries, setEntries] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedEntryId, setSelectedEntryId] = useState(null);


    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await axiosConfig.get('/get-adventures');
                setEntries(response.data);
            } catch (error) {
                console.error('Failed to fetch entries:', error);
            }
        };
        fetchEntries();
    }, []);

    const handleDelete = async (id) => {
        try {
            const deleteEntry = await axiosConfig.delete('/delete-adventure', { data: { id } },

            );
            if (deleteEntry.status >= 200 && deleteEntry.status < 300) {
                console.log('Adventure Deleted!');
                const response = await axiosConfig.get('/get-adventures');
                setEntries(response.data);
            }
        } catch (error) {
            console.error('Error deleting entry:', error);
        }

    };

    const handleEdit = (id) => {
        setSelectedEntryId(id);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedEntryId(null);
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
                {entries.map((entry) => (
                    <Grid key={entry.id}>
                        <Container style={{ backgroundColor: '#381e99', color: 'white', marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
                            <Typography variant="h5" component="h2">{entry.entry_title}</Typography>
                            <Typography variant="body1" component="p">{entry.entry_text}</Typography>
                            <div className={classes.iconButtonsContainer}>
                                <IconButton
                                    aria-label="edit"
                                    className={classes.iconButton}
                                    onClick={() => handleEdit(entry.id)}>
                                    <EditIcon sx={{ color: 'white' }} />
                                </IconButton>
                                <IconButton
                                    aria-label="delete"
                                    className={classes.iconButton}
                                    onClick={() => handleDelete(entry.id)}>
                                    <DeleteForeverIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </div>
                        </Container>
                    </Grid>
                ))}
                <Modal
                    open={editModalOpen && selectedEntryId !== null}
                    onClose={closeEditModal}
                    className={classes.modal}
                    disableEnforceFocus
                >
                    {/* Pass the selectedEntryId as a prop to EditEntryModal */}
                    {selectedEntryId !== null && <EditEntryModal entryId={selectedEntryId} />}
                </Modal>
            </Container>
        </div>
    );

}