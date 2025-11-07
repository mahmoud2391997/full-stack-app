
import express from 'express';
import { getFinancialAccounts, createFinancialAccount, getFinancialAccountById, updateFinancialAccount, deleteFinancialAccount } from '../controllers/financialAccountController.js';

const router = express.Router();

router.get('/financial-accounts', getFinancialAccounts);
router.post('/financial-accounts', createFinancialAccount);
router.get('/financial-accounts/:id', getFinancialAccountById);
router.put('/financial-accounts/:id', updateFinancialAccount);
router.delete('/financial-accounts/:id', deleteFinancialAccount);

export default router;
