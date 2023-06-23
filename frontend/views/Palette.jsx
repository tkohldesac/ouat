import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';

const useStyles = makeStyles(() => ({

    container: {
        height: '300px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    bar: {
        width: '14%',
    },
    deepBlue: {
        backgroundColor: '#002366',
    },
    parchment: {
        backgroundColor: '#F6E6CC',
    },
    purple: {
        backgroundColor: '#6A366A',
    },
    green: {
        backgroundColor: '#00AA55',
    },
    pink: {
        backgroundColor: '#FFB6C1',
    },
    gold: {
        backgroundColor: '#D4AF37',
    },
    gray: {
        backgroundColor: '#808080',
    },
}));

const Palette = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container} >
            <Grid item className={`${classes.bar} ${classes.purple}`} />
            <Grid item className={`${classes.bar} ${classes.deepBlue}`} />
            <Grid item className={`${classes.bar} ${classes.green}`} />
            <Grid item className={`${classes.bar} ${classes.gold}`} />
            <Grid item className={`${classes.bar} ${classes.parchment}`} />
            <Grid item className={`${classes.bar} ${classes.gray}`} />
            <Grid item className={`${classes.bar} ${classes.pink}`} />

        </Grid >
    );
};

export default Palette;
