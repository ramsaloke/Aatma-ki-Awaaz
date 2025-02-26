import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        min: 4,
        unique: true
    },
    password : {
        type: String,
        required: true
    }
})

export default mongoose.model("User", UserSchema)