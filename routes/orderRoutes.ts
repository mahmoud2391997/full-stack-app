
import express from 'express';
import { getOrders, createOrder, getOrderById, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/orders', getOrders);
router.post('/orders', createOrder);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

export default router;
