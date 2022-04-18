import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    vendor: {
        vendorId: {
            type: String,
            required: true
        },
        vendorFristName: {
            type: String,
            required: true
        },
        vendorLastName: {
            type: String,
            required: true
        },
    },
    cuisineId:{
        type : String,
        required : true
    },
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true
    },
    productAvailable: {
        type: Boolean,
        required: true,
        default: false
    },
    combo: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const Product = mongoose.model("Product", productSchema);

export default Product