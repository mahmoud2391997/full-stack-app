
import { Request, Response } from 'express';
import SupplyInventory from '../models/supplyInventory';

export const getSupplyInventories = async (req: Request, res: Response) => {
    try {
        const supplyInventories = await SupplyInventory.find();
        res.status(200).json(supplyInventories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSupplyInventory = async (req: Request, res: Response) => {
    const supplyInventory = new SupplyInventory(req.body);
    try {
        const newSupplyInventory = await supplyInventory.save();
        res.status(201).json(newSupplyInventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSupplyInventoryById = async (req: Request, res: Response) => {
    try {
        const supplyInventory = await SupplyInventory.findById(req.params.id);
        if (supplyInventory) {
            res.status(200).json(supplyInventory);
        } else {
            res.status(404).json({ message: 'SupplyInventory not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSupplyInventory = async (req: Request, res: Response) => {
    try {
        const supplyInventory = await SupplyInventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (supplyInventory) {
            res.status(200).json(supplyInventory);
        } else {
            res.status(404).json({ message: 'SupplyInventory not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSupplyInventory = async (req: Request, res: Response) => {
    try {
        const supplyInventory = await SupplyInventory.findByIdAndDelete(req.params.id);
        if (supplyInventory) {
            res.status(200).json({ message: 'SupplyInventory deleted successfully' });
        } else {
            res.status(404).json({ message: 'SupplyInventory not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
