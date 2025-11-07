
import { Request, Response } from 'express';
import { InventoryItemModel as InventoryItem } from '../models/inventoryItem';

export const getInventoryItems = async (req: Request, res: Response) => {
    try {
        const inventoryItems = await InventoryItem.find();
        res.status(200).json(inventoryItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createInventoryItem = async (req: Request, res: Response) => {
    const inventoryItem = new InventoryItem(req.body);
    try {
        const newInventoryItem = await inventoryItem.save();
        res.status(201).json(newInventoryItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getInventoryItemById = async (req: Request, res: Response) => {
    try {
        const inventoryItem = await InventoryItem.findById(req.params.id);
        if (inventoryItem) {
            res.status(200).json(inventoryItem);
        } else {
            res.status(404).json({ message: 'InventoryItem not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateInventoryItem = async (req: Request, res: Response) => {
    try {
        const inventoryItem = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (inventoryItem) {
            res.status(200).json(inventoryItem);
        } else {
            res.status(404).json({ message: 'InventoryItem not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteInventoryItem = async (req: Request, res: Response) => {
    try {
        const inventoryItem = await InventoryItem.findByIdAndDelete(req.params.id);
        if (inventoryItem) {
            res.status(200).json({ message: 'InventoryItem deleted successfully' });
        } else {
            res.status(404).json({ message: 'InventoryItem not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
