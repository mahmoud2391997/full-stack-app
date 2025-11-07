import { Request, Response } from 'express';
import { TRANSACTIONS } from '../services/mockData';

export const getTransactions = async (req: Request, res: Response) => {
    try {
        res.status(200).json(TRANSACTIONS);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTransaction = async (req: Request, res: Response) => {
    const newTransaction = {
        id: TRANSACTIONS.length + 1,
        ...req.body
    };
    TRANSACTIONS.push(newTransaction);
    res.status(201).json(newTransaction);
};

export const getTransactionById = async (req: Request, res: Response) => {
    const transaction = TRANSACTIONS.find(t => t.id === parseInt(req.params.id));
    if (transaction) {
        res.status(200).json(transaction);
    } else {
        res.status(404).json({ message: 'Transaction not found' });
    }
};

export const updateTransaction = async (req: Request, res: Response) => {
    const index = TRANSACTIONS.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        TRANSACTIONS[index] = { ...TRANSACTIONS[index], ...req.body };
        res.status(200).json(TRANSACTIONS[index]);
    } else {
        res.status(404).json({ message: 'Transaction not found' });
    }
};

export const deleteTransaction = async (req: Request, res: Response) => {
    const index = TRANSACTIONS.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        TRANSACTIONS.splice(index, 1);
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } else {
        res.status(404).json({ message: 'Transaction not found' });
    }
};