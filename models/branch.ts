
import { Schema, model } from 'mongoose';

const BranchSchema = new Schema({
    name: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
});

export const BranchModel = model('Branch', BranchSchema);
