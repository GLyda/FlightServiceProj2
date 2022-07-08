import axios from 'axios';

const url = 'http://localhost:5000/flights';

export const fetchFlights = () => axios.get(url);
export const createFlight = (newFlight) => axios.post(url, newFlight);
export const updateFlight = (id, updatedFlight) => axios.patch(`${url}/${id}`, updatedFlight);
export const deleteFlight = (id) => axios.delete(`${url}/${id}`);