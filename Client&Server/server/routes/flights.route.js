import express from 'express';

import { getFlights, createFlight, updateFlight, deleteFlight } from '../controllers/flights.controller.js';

const router = express.Router();

router.get('/', getFlights); 
router.post('/', createFlight);
router.patch('/:id', updateFlight);
router.delete('/:id', deleteFlight);

export default router;