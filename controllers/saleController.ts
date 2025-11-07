
import { Request, Response } from 'express';
import { SaleModel as Sale } from '../models/sale';

export const getSales = async (req: Request, res: Response) => {
    try {
        const sales = await Sale.find();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSale = async (req: Request, res: Response) => {
    const sale = new Sale(req.body);
    try {
        const newSale = await sale.save();
        res.status(201).json(newSale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSaleById = async (req: Request, res: Response) => {
    try {
        const sale = await Sale.findById(req.params.id);
        if (sale) {
            res.status(200).json(sale);
        } else {
            res.status(404).json({ message: 'Sale not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSale = async (req: Request, res: Response) => {
    try {
        const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (sale) {
            res.status(200).json(sale);
        } else {
            res.status(404).json({ message: 'Sale not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSale = async (req: Request, res: Response) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (sale) {
            res.status(200).json({ message: 'Sale deleted successfully' });
        } else {
            res.status(404).json({ message: 'Sale not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
