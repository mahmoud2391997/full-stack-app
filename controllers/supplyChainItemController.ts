
import { Request, Response } from 'express';
import SupplyChainItem from '../models/supplyChainItem';

export const getSupplyChainItems = async (req: Request, res: Response) => {
    try {
        const supplyChainItems = await SupplyChainItem.find();
        res.status(200).json(supplyChainItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSupplyChainItem = async (req: Request, res: Response) => {
    const supplyChainItem = new SupplyChainItem(req.body);
    try {
        const newSupplyChainItem = await supplyChainItem.save();
        res.status(201).json(newSupplyChainItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSupplyChainItemById = async (req: Request, res: Response) => {
    try {
        const supplyChainItem = await SupplyChainItem.findById(req.params.id);
        if (supplyChainItem) {
            res.status(200).json(supplyChainItem);
        } else {
            res.status(404).json({ message: 'SupplyChainItem not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSupplyChainItem = async (req: Request, res: Response) => {
    try {
        const supplyChainItem = await SupplyChainItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (supplyChainItem) {
            res.status(200).json(supplyChainItem);
        } else {
            res.status(404).json({ message: 'SupplyChainItem not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSupplyChainItem = async (req: Request, res: Response) => {
    try {
        const supplyChainItem = await SupplyChainItem.findByIdAndDelete(req.params.id);
        if (supplyChainItem) {
            res.status(200).json({ message: 'SupplyChainItem deleted successfully' });
        } else {
            res.status(404).json({ message: 'SupplyChainItem not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
