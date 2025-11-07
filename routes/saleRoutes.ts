
import express from 'express';
import { getSales, createSale, getSaleById, updateSale, deleteSale } from '../controllers/saleController.js';

const router = express.Router();

router.get('/sales', getSales);
router.post('/sales', createSale);
router.get('/sales/:id', getSaleById);
router.put('/sales/:id', updateSale);
router.delete('/sales/:id', deleteSale);

export default router;
