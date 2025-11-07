
import express from 'express';
import { getSupplyChainItems, createSupplyChainItem, getSupplyChainItemById, updateSupplyChainItem, deleteSupplyChainItem } from '../controllers/supplyChainItemController.js';

const router = express.Router();

router.get('/supply-chain-items', getSupplyChainItems);
router.post('/supply-chain-items', createSupplyChainItem);
router.get('/supply-chain-items/:id', getSupplyChainItemById);
router.put('/supply-chain-items/:id', updateSupplyChainItem);
router.delete('/supply-chain-items/:id', deleteSupplyChainItem);

export default router;
