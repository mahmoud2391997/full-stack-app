
import { Schema, model } from 'mongoose';

const InventoryItemSchema = new Schema({
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    minStock: { type: Number, default: 0 },
    lotNumber: { type: String },
    expiryDate: { type: Date }
});

export const InventoryItemModel = model('InventoryItem', InventoryItemSchema);
