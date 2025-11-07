
import { Request, Response } from 'express';
import { FinancialAccountModel as FinancialAccount } from '../models/financialAccount';

export const getFinancialAccounts = async (req: Request, res: Response) => {
    try {
        const financialAccounts = await FinancialAccount.find();
        res.status(200).json(financialAccounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createFinancialAccount = async (req: Request, res: Response) => {
    const financialAccount = new FinancialAccount(req.body);
    try {
        const newFinancialAccount = await financialAccount.save();
        res.status(201).json(newFinancialAccount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getFinancialAccountById = async (req: Request, res: Response) => {
    try {
        const financialAccount = await FinancialAccount.findById(req.params.id);
        if (financialAccount) {
            res.status(200).json(financialAccount);
        } else {
            res.status(404).json({ message: 'FinancialAccount not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFinancialAccount = async (req: Request, res: Response) => {
    try {
        const financialAccount = await FinancialAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (financialAccount) {
            res.status(200).json(financialAccount);
        } else {
            res.status(404).json({ message: 'FinancialAccount not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteFinancialAccount = async (req: Request, res: Response) => {
    try {
        const financialAccount = await FinancialAccount.findByIdAndDelete(req.params.id);
        if (financialAccount) {
            res.status(200).json({ message: 'FinancialAccount deleted successfully' });
        } else {
            res.status(404).json({ message: 'FinancialAccount not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
