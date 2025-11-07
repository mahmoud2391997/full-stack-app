
import express from 'express';
import { getSupplyMovements, createSupplyMovement, getSupplyMovementById, updateSupplyMovement, deleteSupplyMovement } from '../controllers/supplyMovementController.js';

const router = express.Router();

router.get('/supply-movements', getSupplyMovements);
router.post('/supply-movements', createSupplyMovement);
router.get('/supply-movements/:id', getSupplyMovementById);
router.put('/supply-movements/:id', updateSupplyMovement);
router.delete('/supply-movements/:id', deleteSupplyMovement);

export default router;
