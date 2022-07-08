import mongoose from "mongoose";
import express from 'express';
import FlightModel from "../models/flights.model.js";

const router = express.Router();

export const getFlights = async (req, res) => {
    try {
        const flightModels = await FlightModel.find();
        
        res.status(200).json(flightModels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getFlight = async (req, res) => { 
    const { id } = req.params;

    try {
        const flight = await FlightModel.findById(id);
        
        res.status(200).json(flight);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createFlight = async (req, res) => {

    const { flightNumber, departureDate, departureTime, arrivalDate, arrivalTime, departureAirport, arrivalAirport, passengerCount, passengerLimit } = req.body;

    const newFlight = new FlightModel({ flightNumber, departureDate, departureTime, arrivalDate, arrivalTime, departureAirport, arrivalAirport, passengerCount, passengerLimit })

    try {

        await newFlight.save();

        res.status(201).json(newFlight);

    } catch (error) {
        res.status(409).json( { message: error.message });
    }

}

export const updateFlight = async (req, res) => {
    const { id } = req.params;
    const { flightNumber, departureDate,  departureTime, arrivalDate, arrivalTime, departureAirport, arrivalAirport, passengerCount, passengerLimit } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No flight with that id');
    
    const updatedFlight = { flightNumber, departureDate, departureTime, arrivalDate, arrivalTime, departureAirport, arrivalAirport, passengerCount, passengerLimit, _id: id };
    
    await FlightModel.findByIdAndUpdate(id, updatedFlight, { new: true });


    res.json(updatedFlight);
}

export const deleteFlight = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No flight with id: ${id}`);

    await FlightModel.findByIdAndRemove(id);

    res.json({ message: "Flight deleted successfully." });
}

export default router;