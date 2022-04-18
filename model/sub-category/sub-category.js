import mongoose from 'mongoose'

const subCategorySchema = new mongoose.Schema({

    categoryId: {
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

const subCategory = mongoose.model("subCategory", subCategorySchema)


export default subCategory