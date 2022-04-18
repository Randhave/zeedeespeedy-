import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    vendorId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    active: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    }

})

const Category = mongoose.model("Category", categorySchema)

export default Category