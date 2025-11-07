
import { Schema, model } from 'mongoose';

const supplyMovementSchema = new Schema({
    itemId: { type: Schema.Types.ObjectId, ref: 'SupplyChainItem', required: true },
    from: { type: String, required: true }, // Could be a supplier name, branch name, etc.
    to: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['Inbound', 'Outbound', 'Internal'], required: true }, // Inbound from supplier, Outbound to customer/branch, Internal transfer
});

export default model('SupplyMovement', supplyMovementSchema);
