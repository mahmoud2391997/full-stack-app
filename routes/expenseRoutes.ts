
import express from 'express';
import { getExpenses, createExpense, getExpenseById, updateExpense, deleteExpense } from '../controllers/expenseController.js';

const router = express.Router();

router.get('/expenses', getExpenses);
router.post('/expenses', createExpense);
router.get('/expenses/:id', getExpenseById);
router.put('/expenses/:id', updateExpense);
router.delete('/expenses/:id', deleteExpense);

export default router;
