
import express from 'express';
import { getSuppliers, createSupplier, getSupplierById, updateSupplier, deleteSupplier } from '../controllers/supplierController.js';

const router = express.Router();

router.get('/suppliers', getSuppliers);
router.post('/suppliers', createSupplier);
router.get('/suppliers/:id', getSupplierById);
router.put('/suppliers/:id', updateSupplier);
router.delete('/suppliers/:id', deleteSupplier);

export default router;
