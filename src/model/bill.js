import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    ward: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    numberHouse: {
        type: String,
        required: true
    },
    products: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});


export default mongoose.model("Bill", billSchema);