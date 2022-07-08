import React from 'react';
import Flight from './Flight/Flight';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';



const Flights = ({ setCurrentId }) => {
    const flights = useSelector((state) => state.flights);
    const classes = useStyles();

    console.log(flights);
    return (
        !flights.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={1}>
                {flights.map((flight) => (
                    <Grid key={flight._id} item xs={12} md={4}>
                        <Flight flight={flight} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Flights;