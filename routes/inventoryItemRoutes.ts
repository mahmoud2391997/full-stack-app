
import express from 'express';
import { getInventoryItems, createInventoryItem, getInventoryItemById, updateInventoryItem, deleteInventoryItem } from '../controllers/inventoryItemController.js';

const router = express.Router();

router.get('/inventory-items', getInventoryItems);
router.post('/inventory-items', createInventoryItem);
router.get('/inventory-items/:id', getInventoryItemById);
router.put('/inventory-items/:id', updateInventoryItem);
router.delete('/inventory-items/:id', deleteInventoryItem);

export default router;
