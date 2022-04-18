import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const vendorSchema = new mongoose.Schema({
    buildingName: {
        type: String,
        required: true
    },
    businessCategoryId: {
        type: String,
        required: true
    },
    cityId: {
        type: Number,
        required: true
    },
    countryId: {
        type: Number,
        required: true
    },
    stateId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please provid valid email | format"]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    landmark: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    pincodeId: {
        type: Number,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    streetNo: {
        type: String,
        required: true
    },
    sunday: {
        type: Boolean,
        required: true,
        default: false
    },
    monday: {
        type: Boolean,
        required: true,
        default: false
    },
    tuesday: {
        type: Boolean,
        required: true,
        default: false
    },
    wednesday: {
        type: Boolean,
        required: true,
        default: false
    },
    thursday: {
        type: Boolean,
        required: true,
        default: false
    },
    friday: {
        type: Boolean,
        required: true,
        default: false
    },
    saturday: {
        type: Boolean,
        required: true,
        default: false
    }

})
// decrypt password before save in db
vendorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
})

// create jsonwebtoken
vendorSchema.methods.generateToken = async function (next) {
    return jwt.sign({ id: this._id }, process.env.PRIVATE_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}


const Vendor = mongoose.model("Vendor", vendorSchema)
export default Vendor