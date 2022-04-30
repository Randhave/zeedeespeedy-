import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    uploadMessage: {
        type: String,
        required: true
    }
})

const Brand = mongoose.model("Brand", brandSchema)

export default Brand

