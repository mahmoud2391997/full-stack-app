
import express from 'express';
import { getBranches, createBranch, getBranchById, updateBranch, deleteBranch } from '../controllers/branchController.js';

const router = express.Router();

router.get('/branches', getBranches);
router.post('/branches', createBranch);
router.get('/branches/:id', getBranchById);
router.put('/branches/:id', updateBranch);
router.delete('/branches/:id', deleteBranch);

export default router;
