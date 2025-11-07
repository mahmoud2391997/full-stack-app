
import { Schema, model } from 'mongoose';

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
