
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    permissions: [{ type: String }],
    branchId: { type: Schema.Types.ObjectId, ref: 'Branch' }
});

export const UserModel = model('User', UserSchema);
