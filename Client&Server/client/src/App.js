import React, { useState, useEffect } from 'react';
import { Card, Container, CssBaseline, AppBar, Typography, Grid, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getFlights } from './actions/flights';
import Flights from './components/Flights/Flights';
import Form from './components/Form/Form';
import oceanicImage from './images/oceanicImage.png';
import useStyles from './styles';
const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFlights());
    }, [currentId, dispatch]);
//Main Application Frontside
    return (
        <>
        <CssBaseline/>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className= {classes.heading} variant="h2" align="center">Flight Service</Typography> 
                <img className={classes.image} src={oceanicImage} alt="oceanicImage" height="60" />
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </AppBar>
            <main>
                <div>
                    <Container minWidth="100%">
                        <Paper container spacing={10}>
                            <Grid item>
                                <Card>
                                    <Flights setCurrentId={setCurrentId} />
                                </Card>
                            </Grid>
                        </Paper>   
                    </Container>
                </div>
            </main>
                
        
        </>
    );
}

export default App;