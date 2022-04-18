import mongoose from 'mongoose'

const cuisineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
})

const Cuisine = mongoose.model("Cuisine", cuisineSchema)

export default Cuisine