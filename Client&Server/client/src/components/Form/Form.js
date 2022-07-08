import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Modal } from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { createFlight, updateFlight } from '../../actions/flights';



const Form = ({ currentId, setCurrentId }) => {
    const [flightData, setFlightData] = useState({
        flightNumber: '',
        departureDate: '',
        arrivalDate: '',
        departureTime: '',
        arrivalTime: '',
        departureAirport: '',
        arrivalAirport: '',
        passengerCount: '',
        passengerLimit: '',

    });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    const flight = useSelector((state) => currentId ? state.flights.find((f) => f._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(flight) setFlightData(flight);
    }, [flight])



    const clear = () => {
        setCurrentId(null);
        setFlightData({
            flightNumber: '',
            departureDate: '',
            arrivalDate: '',
            departureTime: '',
            arrivalTime: '',
            departureAirport: '',
            arrivalAirport: '',
            passengerCount: '',
            passengerLimit: '',
        });

    }

    //Validation/ErrorCheck Functions


    const flightNumHelperTxt = (currentFlightNum) => {
        if(currentFlightNum == ""){
            return "Input Required (Must Be Number)"
        } else if (currentFlightNum < 0 ){
            return "Must Be A Positive Number"
        } else{
            return false
        }

    }

    const departDateHelperTxt = (currentDepartDate) => {
        if (currentDepartDate == ""){
            return "Input Required"
        } else if(currentDepartDate > flightData.arrivalDate & (flightData.arrivalDate != "")){
            return "Depart Date Cannot Be Before Arrival"
        } else{
            return false
        }
    }

    const departTimeHelperTxt = (currentDepartTime) => {
        if(currentDepartTime == "")
            return "Input Required"
    }
    const arrivalDateHelperTxt = (currentArrivalDate) => {
        if (currentArrivalDate == ""){
            return "Input Required"
        } else if(currentArrivalDate < flightData.departureDate & (flightData.departureDate != "")){
            return "Arrival Date Cannot Be After Departure"
        } else{
            return false
        }
    }
    const arrivalTimeHelperTxt = (currentArrivalTime) => {
        if(currentArrivalTime == "")
            return "Input Required"
    }
    const departureAirportHelperTxt = (currentDepartureAirport) => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if (currentDepartureAirport == ""){
            return "Input Required"
        } else if (specialChars.test(currentDepartureAirport)){
            return "Special Characters Not Allowed"
        } else{
            return false
        }  
    }
    const arrivalAirportHelperTxt = (currentArrivalAirport) => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if (currentArrivalAirport == ""){
            return "Input Required"
        } else if (specialChars.test(currentArrivalAirport)){
            return "Special Characters Not Allowed"
        } else{
            return false
        }
    }
    const passengerCountHelperTxt = (currentPassengerCount) => {
        if (currentPassengerCount == ""){
            return "Input Required (Must Be Number)"
        } else if (currentPassengerCount < 0){
            return "Must Be Positive Number"
        }else if(currentPassengerCount > flightData.passengerLimit & (flightData.passengerLimit != "")){
            return "Cannot Be More than Passenger Limit"
        } else{
            return false
        }
    }
    const passengerLimitHelperTxt = (currentPassengerLimit) => {
        if (currentPassengerLimit == ""){
            return "Input Required (Must Be Number)"
        } else if (currentPassengerLimit < 0){
            return "Must Be Positive Number"
        }else if(currentPassengerLimit < flightData.passengerCount & (flightData.passengerCount != "")){
            return "Cannot Be Less Than Passenger Count"
        } else{
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateFlight(currentId, flightData));
            clear();
        } else { 
            dispatch(createFlight(flightData));
            clear();
        }
        
    }


    //Form Modal, Buttons, and Input Fields
    return (
        <>
        <Button variant ="outlined" color="primary" onClick={handleOpen}>Create/Edit Flight</Button>
        <Modal open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            align= "center"
        >
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form} `} onSubmit={handleSubmit}>
                    <Typography variant="h6" align='center'>{currentId ? 'Edit' : 'Create' } a Flight </Typography>
                    { <TextField
                        required
                        name="Flight Number"
                        type="number" 
                        variant="outlined" 
                        label="Flight Number"
                        value={flightData.flightNumber}
                        onChange={(e) =>setFlightData({ ...flightData, flightNumber: e.target.value }) }
                        error= {flightNumHelperTxt(flightData.flightNumber)}
                        helperText={flightNumHelperTxt(flightData.flightNumber)} 
                    />}
                    <TextField
                        required
                        name="Departure Date"
                        type="date" 
                        variant="outlined" 
                        label="Departure Date" 
                        value={flightData.departureDate}
                        onChange={(e) =>setFlightData({ ...flightData, departureDate: e.target.value }) }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={departDateHelperTxt(flightData.departureDate)}
                        helperText={departDateHelperTxt(flightData.departureDate)} 
                    />
                    <TextField
                        required
                        name="Departure Time" 
                        variant="outlined" 
                        label="Departure Time" 
                        type="time"
                        value={flightData.departureTime}
                        onChange={(e) =>setFlightData({ ...flightData, departureTime: e.target.value }) }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={departTimeHelperTxt(flightData.departureTime)}
                        helperText={departTimeHelperTxt(flightData.departureTime)}
                        
                    />
                    <TextField
                        required
                        name="Arrival Date" 
                        variant="outlined" 
                        label="Arrival Date" 
                        type="date"
                        value={flightData.arrivalDate}
                        onChange={(e) =>setFlightData({ ...flightData, arrivalDate: e.target.value }) }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={arrivalDateHelperTxt(flightData.arrivalDate)}
                        helperText={arrivalDateHelperTxt(flightData.arrivalDate)}  
                    />
                    
                    <TextField
                        required
                        name="Arrival Time" 
                        variant="outlined" 
                        label="Arrival Time" 
                        type="time"
                        value={flightData.arrivalTime}
                        onChange={(e) =>setFlightData({ ...flightData, arrivalTime: e.target.value }) }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={arrivalTimeHelperTxt(flightData.arrivalTime)}
                        helperText={arrivalTimeHelperTxt(flightData.arrivalTime)} 
                    />
                    <TextField
                        required
                        name="Departure Airport" 
                        variant="outlined" 
                        label="Departure Airport" 
                        value={flightData.departureAirport}
                        onChange={(e) =>setFlightData({ ...flightData, departureAirport: e.target.value }) }
                        error={departureAirportHelperTxt(flightData.departureAirport)}
                        helperText={departureAirportHelperTxt(flightData.departureAirport)}

                    />
                    <TextField
                        required
                        name="Arrival Airport" 
                        variant="outlined" 
                        label="Arrival Airport"
                        value={flightData.arrivalAirport}
                        onChange={(e) =>setFlightData({ ...flightData, arrivalAirport: e.target.value }) }
                        error={arrivalAirportHelperTxt(flightData.arrivalAirport)}
                        helperText={arrivalAirportHelperTxt(flightData.arrivalAirport)} 
                    />
                    { <TextField
                        required
                        name="Passenger Count" 
                        variant="outlined" 
                        label="Passenger Count" 
                        type="number"
                        value={flightData.passengerCount}
                        onChange={(e) =>setFlightData({ ...flightData, passengerCount: e.target.value }) }
                        error={passengerCountHelperTxt(flightData.passengerCount)} 
                        helperText={passengerCountHelperTxt(flightData.passengerCount)}
                    /> }
                    { <TextField
                        required
                        name="Passenger Limit" 
                        variant="outlined" 
                        label="Passenger Limit" 
                        type="number"
                        value={flightData.passengerLimit}
                        onChange={(e) =>setFlightData({ ...flightData, passengerLimit: e.target.value }) }
                        error={passengerLimitHelperTxt(flightData.passengerLimit)} 
                        helperText={passengerLimitHelperTxt(flightData.passengerLimit)}
                    /> }
                    
                    <Button className={classes.buttonSubmit} variant ="outlined" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button className={classes.buttonSubmit} variant ="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>

            </Paper>
        </Modal>
        </>
    );
}

export default Form;