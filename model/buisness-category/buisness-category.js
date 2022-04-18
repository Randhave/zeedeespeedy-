import mongoose from 'mongoose'

const buisnessCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    restaurantType: {
        type: Boolean,
        required: true
    },
    isDefault: {
        type: Boolean,
        required: true
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    imageUrl: {
        type: String,

    },
    comissionRate: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const buisnessCategory = mongoose.model("buisnessCategory", buisnessCategorySchema)

export default buisnessCategory