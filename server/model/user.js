import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    birthDate: {
        type: String,
        default: ''
    }
})

const user = mongoose.model('user',userSchema);

export default user;