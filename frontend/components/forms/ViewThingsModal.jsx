import React, { useState, useEffect } from "react"
import Container from '@material-ui/core/Container';
import { IconButton, Grid, Typography, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../helpers/axiosConfig'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditThingModal from "./EditThingModal";

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
}));



export default function createThingModal() {
    const [things, setThings] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedThingId, setSelectedThingId] = useState(null);

    useEffect(() => {
        const fetchThings = async () => {
            try {
                const response = await axiosConfig.get('/get-things');

                setThings(response.data);

            } catch (error) {
                console.error('Failed to fetch things:', error);
            }
        };
        fetchThings();
    }, []);

    const classes = useStyles();

    const handleDelete = async (id) => {
        try {
            const deleteThing = await axiosConfig.delete('/delete-thing', { data: { id } },

            );
            if (deleteThing.status >= 200 && deleteThing.status < 300) {
                console.log('Thing Deleted!');
                const response = await axiosConfig.get('/get-things');
                setThings(response.data);
            }
        } catch (error) {
            console.error('Error deleting person:', error);
        }
    };

    const handleEdit = (id) => {
        setSelectedThingId(id);
        setEditModalOpen(true);
    };
    const closeEditModal = () => {
        setSelectedThingId(null);
        setEditModalOpen(false);
    };

    return (
        <>
            <Container maxWidth="sm" style={{ backgroundColor: '#f4a2fd', paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Typography variant='h5' style={{ paddingBottom: '1rem', textAlign: 'center', color: 'white' }}>VIEW THINGS</Typography>
                {things.map((thing) => (
                    <Grid key={thing.id}>
                        <Container style={{ backgroundColor: '#381e99', color: 'white', marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }} >
                            <Typography variant="h5" component="h2">{thing.thing_name}</Typography>
                            <Typography variant="body1" component="p">{thing.physical_description}</Typography>
                            <Typography variant="body1" component="p">{thing.special_properties}</Typography>
                            <img alt="Image" src={thing.img_url}></img>
                            <div className={classes.iconButtonsContainer}>
                                <IconButton aria-label="delete" className={classes.iconButton} onClick={() => handleEdit(thing.id)}>
                                    <EditIcon sx={{ color: 'white' }} />
                                </IconButton>
                                <IconButton aria-label="delete" className={classes.iconButton} onClick={() => handleDelete(thing.id)}>
                                    <DeleteForeverIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </div>
                        </Container>
                    </Grid>
                ))}
                <Modal
                    open={editModalOpen && selectedThingId !== null}
                    onClose={closeEditModal}
                    className={classes.modal}
                    disableEnforceFocus
                >
                    {selectedThingId !== null && <EditThingModal thingId={selectedThingId} />}
                </Modal>
            </Container>
        </ >
    )
}