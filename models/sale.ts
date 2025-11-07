
import { Schema, model } from 'mongoose';

const SaleSchema = new Schema({
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    brand: { type: String, enum: ['Arabiva', 'Generic'], required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    customerName: { type: String, required: true },
    date: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Cash', 'Card', 'K-Net', 'Credit', 'MyFatoorah'], required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Overdue'], required: true },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        total: { type: Number, required: true }
    }],
    sessionId: { type: Schema.Types.ObjectId, ref: 'POSSession' },
    source: { type: String, enum: ['In-Store', 'Website'], default: 'In-Store' }
});

export const SaleModel = model('Sale', SaleSchema);
