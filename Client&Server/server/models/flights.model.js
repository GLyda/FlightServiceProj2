import mongoose from "mongoose";

const flightSchema = mongoose.Schema({
    flightNumber: Number,
    departureDate: Date,
    departureTime: String,
    arrivalDate: Date,
    arrivalTime: String,
    departureAirport: String,
    arrivalAirport: String,
    passengerCount: Number,
    passengerLimit: Number,

    
   

});

const FlightModel = mongoose.model('FlightModel', flightSchema);

export default FlightModel;