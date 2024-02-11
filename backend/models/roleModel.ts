import { Schema, model } from 'mongoose'

const schemaRole = new Schema({
    role : {
        type : String,
        required : true
    },

    permission : [{
        type : Schema.Types.ObjectId, ref: 'Permission',
        required : false
    }],
})

const roleModel = model('User', schemaRole)
module.exports =  roleModel 
