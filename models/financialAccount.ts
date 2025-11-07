
import { Schema, model } from 'mongoose';

const FinancialAccountSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Bank', 'Cash'], required: true },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
    balance: { type: Number, default: 0 }
});

export const FinancialAccountModel = model('FinancialAccount', FinancialAccountSchema);
