import mongoose, { Schema, Document } from 'mongoose';


const SubscribedUserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.SubscribedUser || mongoose.model('SubscribedUser', SubscribedUserSchema);