
import { Schema, model, Document } from 'mongoose';

// User Schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    permissions: [{ type: String }],
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch' }
});
export const UserModel = model('User', UserSchema);

// Branch Schema
const BranchSchema = new Schema({
    name: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
});
export const BranchModel = model('Branch', BranchSchema);

// Supplier Schema
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

// Product Schema
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

// Customer Schema
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

// Sale Schema
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

// Employee Schema
const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    salary: { type: Number, required: true },
    allowances: { type: Number, default: 0 },
    advances: { type: Number, default: 0 },
    hireDate: { type: Date, required: true },
    annualLeaveDays: { type: Number, default: 0 }
});
export const EmployeeModel = model('Employee', EmployeeSchema);

// InventoryItem Schema
const InventoryItemSchema = new Schema({
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    minStock: { type: Number, default: 0 },
    lotNumber: { type: String },
    expiryDate: { type: Date }
});
export const InventoryItemModel = model('InventoryItem', InventoryItemSchema);

// Expense Schema
const ExpenseSchema = new Schema({
    date: { type: Date, default: Date.now },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    paidFromAccountId: { type: Schema.Types.ObjectId, ref: 'FinancialAccount', required: true }
});
export const ExpenseModel = model('Expense', ExpenseSchema);

// FinancialAccount Schema
const FinancialAccountSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Bank', 'Cash'], required: true },
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
    balance: { type: Number, default: 0 }
});
export const FinancialAccountModel = model('FinancialAccount', FinancialAccountSchema);
