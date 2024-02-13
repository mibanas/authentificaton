    import { Schema, model } from 'mongoose';

    const permissionSchema = new Schema({
    module: {
        type: String,
        required: true,
        unique: true
    },
    create: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    },
    update: {
        type: Boolean,
        default: false
    },
    deletee: {
        type: Boolean,
        default: false
    }
    });

    const permissionModel = model('Permission', permissionSchema);

    export default permissionModel;
