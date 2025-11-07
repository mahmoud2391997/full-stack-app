
import { Request, Response } from 'express';
import SupplyMovement from '../models/supplyMovement';

export const getSupplyMovements = async (req: Request, res: Response) => {
    try {
        const supplyMovements = await SupplyMovement.find();
        res.status(200).json(supplyMovements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSupplyMovement = async (req: Request, res: Response) => {
    const supplyMovement = new SupplyMovement(req.body);
    try {
        const newSupplyMovement = await supplyMovement.save();
        res.status(201).json(newSupplyMovement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getSupplyMovementById = async (req: Request, res: Response) => {
    try {
        const supplyMovement = await SupplyMovement.findById(req.params.id);
        if (supplyMovement) {
            res.status(200).json(supplyMovement);
        } else {
            res.status(404).json({ message: 'SupplyMovement not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSupplyMovement = async (req: Request, res: Response) => {
    try {
        const supplyMovement = await SupplyMovement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (supplyMovement) {
            res.status(200).json(supplyMovement);
        } else {
            res.status(404).json({ message: 'SupplyMovement not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSupplyMovement = async (req: Request, res: Response) => {
    try {
        const supplyMovement = await SupplyMovement.findByIdAndDelete(req.params.id);
        if (supplyMovement) {
            res.status(200).json({ message: 'SupplyMovement deleted successfully' });
        } else {
            res.status(404).json({ message: 'SupplyMovement not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
