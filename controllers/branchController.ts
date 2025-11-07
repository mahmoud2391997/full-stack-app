
import { Request, Response } from 'express';
import { BranchModel as Branch } from '../models/branch';

export const getBranches = async (req: Request, res: Response) => {
    try {
        const branches = await Branch.find();
        res.status(200).json(branches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBranch = async (req: Request, res: Response) => {
    const branch = new Branch(req.body);
    try {
        const newBranch = await branch.save();
        res.status(201).json(newBranch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBranchById = async (req: Request, res: Response) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (branch) {
            res.status(200).json(branch);
        } else {
            res.status(404).json({ message: 'Branch not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBranch = async (req: Request, res: Response) => {
    try {
        const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (branch) {
            res.status(200).json(branch);
        } else {
            res.status(404).json({ message: 'Branch not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBranch = async (req: Request, res: Response) => {
    try {
        const branch = await Branch.findByIdAndDelete(req.params.id);
        if (branch) {
            res.status(200).json({ message: 'Branch deleted successfully' });
        } else {
            res.status(404).json({ message: 'Branch not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
