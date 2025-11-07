
import { Schema, model } from 'mongoose';

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    balance: { type: Number, default: 0 },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
    addedBy: { type: String, required: true }
});

export const CustomerModel = model('Customer', CustomerSchema);
