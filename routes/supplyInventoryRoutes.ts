
import express from 'express';
import { getSupplyInventories, createSupplyInventory, getSupplyInventoryById, updateSupplyInventory, deleteSupplyInventory } from '../controllers/supplyInventoryController.js';

const router = express.Router();

router.get('/supply-inventories', getSupplyInventories);
router.post('/supply-inventories', createSupplyInventory);
router.get('/supply-inventories/:id', getSupplyInventoryById);
router.put('/supply-inventories/:id', updateSupplyInventory);
router.delete('/supply-inventories/:id', deleteSupplyInventory);

export default router;
