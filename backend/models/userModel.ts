import { Schema, model } from 'mongoose';

const userSchema: Schema = new Schema({
    completeName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
    isActive: {
        type: Boolean,
        required: true,
        default : false,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: false,
    }},
    { timestamps: true }
)

const userModel = model('User', userSchema)

export default userModel

