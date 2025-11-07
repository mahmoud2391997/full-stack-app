
import { Schema, model } from 'mongoose';

const ExpenseSchema = new Schema({
    date: { type: Date, default: Date.now },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    paidFromAccountId: { type: Schema.Types.ObjectId, ref: 'FinancialAccount', required: true }
});

export const ExpenseModel = model('Expense', ExpenseSchema);
