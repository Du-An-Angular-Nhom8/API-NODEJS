import mongoose from "mongoose";

const userShema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: String,
    role: {
        type: String,
        default: "member"
    }
})
export default mongoose.model("User", userShema)