
import { Schema, model } from 'mongoose';

const supplyChainItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    unit: { type: String, required: true }, // e.g., kg, liter, piece
    supplier: { type: String }, // Simplified for now
});

export default model('SupplyChainItem', supplyChainItemSchema);
