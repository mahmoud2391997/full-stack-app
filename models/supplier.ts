
import { Schema, model } from 'mongoose';

const SupplierSchema = new Schema({
    code: { type: String },
    name: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    balance: { type: Number, default: 0 }
});

export const SupplierModel = model('Supplier', SupplierSchema);
