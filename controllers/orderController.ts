import { Request, Response } from 'express';
import { ORDERS } from '../services/mockData';

export const getOrders = async (req: Request, res: Response) => {
    try {
        res.status(200).json(ORDERS);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    const newOrder = {
        id: ORDERS.length + 1,
        ...req.body
    };
    ORDERS.push(newOrder);
    res.status(201).json(newOrder);
};

export const getOrderById = async (req: Request, res: Response) => {
    const order = ORDERS.find(o => o.id === parseInt(req.params.id));
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    const index = ORDERS.findIndex(o => o.id === parseInt(req.params.id));
    if (index !== -1) {
        ORDERS[index] = { ...ORDERS[index], ...req.body };
        res.status(200).json(ORDERS[index]);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    const index = ORDERS.findIndex(o => o.id === parseInt(req.params.id));
    if (index !== -1) {
        ORDERS.splice(index, 1);
        res.status(200).json({ message: 'Order deleted successfully' });
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};