
import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    baseUnit: { type: String, enum: ['pcs', 'g', 'ml'], required: true },
    productLine: { type: String },
    fragranceNotes: {
        top: { type: String },
        middle: { type: String },
        base: { type: String }
    },
    components: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number }
    }],
    barcode: { type: String },
    density: { type: Number },
    description: { type: String },
    brand: { type: String },
    purchasePrice: { type: Number },
    isTaxable: { type: Boolean, default: false },
    lowestSellingPrice: { type: Number },
    discountPercent: { type: Number },
    hasExpiryDate: { type: Boolean, default: false },
    trackInventory: { type: Boolean, default: true },
    alertQuantity: { type: Number, default: 0 },
    internalNotes: { type: String },
    tags: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    supplierProductCode: { type: String },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    image: { type: String }
});

export const ProductModel = model('Product', ProductSchema);
