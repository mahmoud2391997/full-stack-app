
import express from 'express';
import { getCustomers, createCustomer, getCustomerById, updateCustomer, deleteCustomer } from '../controllers/customerController.js';

const router = express.Router();

router.get('/customers', getCustomers);
router.post('/customers', createCustomer);
router.get('/customers/:id', getCustomerById);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

export default router;
