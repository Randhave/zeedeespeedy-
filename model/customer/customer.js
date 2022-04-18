import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        validate: [validator.isEmail, "Please provid valid email | format"]
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    phoneNumberVarified: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    gender: {
        type: String,
        // required: true
        default: null
    },
    birthDate: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "Pending"
    },
    registeredVia: {
        type: String,
        default: null
    },
    walletAmt: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    varifyCustomerToken: String,
    resetCustomerTokenExpire: Date,
    varifyCustomerNumber: Number,
    varifyCustomerTokenExpire: Date,
    varifyCustomerOTP: Number,
    varifyCustomerOTPExpire: Date
})
// decrypt password before save 
customerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
})

// create jsonwebtoken
customerSchema.methods.generateToken = async function (next) {
    return jwt.sign({ id: this._id }, process.env.PRIVATE_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}



// generate token for varify or active customer account
customerSchema.methods.generateTokenForVarifyCustomer = async function () {
    const varifyToken = crypto.randomBytes(20).toString("hex");
    this.varifyCustomerToken = crypto.createHash("sha256").update(varifyToken).digest("hex");
    this.resetCustomerTokenExpire = Date.now() + 15 * 60 * 1000;
    return varifyToken;
}

// generate token for varify or activate account by otp
customerSchema.methods.generateOTP = async function () {
    const otp = Math.floor(Math.random() * 100) + 11;
    this.varifyCustomerOTP = otp
    this.varifyCustomerOTPExpire = Date.now() + 15 * 60 * 100;
    return otp
}

// generate token for varify or active customer account
customerSchema.methods.generateTokenForVarifyCustomerByMobile = async function () {
    const varifyToken = crypto.randomBytes(20).toString("hex");
    this.varifyCustomerNumber = crypto.createHash("sha256").update(varifyToken).digest("hex");
    this.varifyCustomerTokenExpire = Date.now() + 15 * 60 * 1000;
    return varifyToken;
}

const Customer = mongoose.model("Customer", customerSchema);

export default Customer