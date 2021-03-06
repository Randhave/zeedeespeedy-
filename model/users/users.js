import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'


// const UsersSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     emailVerified: {
//         type: Boolean,
//         default: false
//     },
//     phoneNumber: {
//         type: Number,
//         required: true,
//         select: false
//     },
//     phoneVerified: {
//         type: Boolean,
//         default: false
//     },
//     password: {
//         type: String,
//         required: true,
//         select: false
//     },
//     canChangePassword: {
//         type: String,
//         default: null
//     },
//     status: {
//         type: Number,
//         default: 0
//     },
//     scope: {
//         type: String,
//         default: "trust read user_info write"
//     },
//     message: {
//         type: String,
//         default: null
//     },
//     resetpasswordToken: String,
//     resetpasswordExpire: Date,
//     Role: {
//         type: String,
//         // default: "NORMAL"
//         default: "ADMIN"
//         //   default: "SUPER_ADMIN"
//     }
// })


const UsersSchema = new mongoose.Schema({
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
        validate: [validator.isEmail, "Please provid valid email | format"]
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: Number,
        required: true,
        select: false
    },
    phoneVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    active: {
        type: Boolean,
        default: true
    },
    resetpasswordToken: String,
    resetpasswordExpire: Date,
    Role: {
        type: String,
        default: "NORMAL"
        // default: "ADMIN"
        //   default: "SUPER_ADMIN"
    }
}) 



// decrypt password before save 
UsersSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 12)
})


// create jsonwebtoken
UsersSchema.methods.generateToken = async function (next) {
    return jwt.sign({ id: this._id }, process.env.PRIVATE_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}


// generate token for reseting password
UsersSchema.methods.generateTokenForResetPassword = async function () {

    // token , this token not generated by jswonwebtoken we generate by crypto module
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetpasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetpasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}


const User = mongoose.model("User", UsersSchema)

export default User