
import { Schema, model } from 'mongoose';

const supplyInventorySchema = new Schema({
    itemId: { type: Schema.Types.ObjectId, ref: 'SupplyChainItem', required: true },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    quantity: { type: Number, required: true, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
});

export default model('SupplyInventory', supplyInventorySchema);
