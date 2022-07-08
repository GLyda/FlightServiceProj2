import React from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFlight } from '../../../actions/flights';


const Flight = ({ flight, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const initialText = 'Import to Editor';
  const [buttonText, setButtonText] = useState(initialText);

  

  const handleClick = () => setButtonText('Imported!');

  setTimeout(() => {
    setButtonText(initialText);
  }, 1000);


    return (
        <Card className={classes.card}>
            <CardMedia  className={classes.media} image={'https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&rect=9%2C0%2C2994%2C1999&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip'} />
            <div className={classes.overlay}>
                <Typography variant="h6">#{flight.flightNumber}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color:"white"}} size="small" onClick={() => {setCurrentId(flight._id); handleClick()}}>
                    {buttonText}
                </Button> 
            </div>
            <CardContent>
                <Typography className={classes.flightNumber} variant="h5" gutterBottom>{flight.departureAirport} -{'>'} {flight.arrivalAirport}</Typography>
                <Typography className={classes.flightNumber} variant="h6" gutterBottom>{flight.departureTime} -{'>'} {flight.arrivalTime}</Typography>
                <Typography className={classes.flightNumber} variant="h6" gutterBottom>Passengers: {flight.passengerCount}/{flight.passengerLimit}</Typography>

            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(deleteFlight(flight._id))}> 
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>

        </Card>
    );
}

export default Flight;