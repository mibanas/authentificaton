import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    completeName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : Schema.Types.ObjectId, ref: 'Role',
        required : true
    },
})

const userModel = model('User', userSchema)
module.exports =  userModel 
