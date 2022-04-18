import Vendor from "../../../model/vendor/vendor.js"

import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import sendToken from "../../../utils/jwtToken.js";

export const vendorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Invalid credentials")
        } 

        const user = await Vendor.findOne({ email: email }).select("+password");
        if (!user) {
            throw new Error("Invalid credentials ! please Try again latter")
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        console.log("user password is matched ............", isPasswordMatch);
        if (!isPasswordMatch) {
            throw new Error("Invalid credentials ! please Try again latter")
        };
        console.log("user from vendor login ", user);

        sendToken(user, "vendorAccessToken", res)

    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// logout vendor
export const vendorLogout = async (req, res) => {
    try {
        res.cookie("vendorAccessToken", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.json({ success: true, message: "logout successfully" })
    } catch (error) {
        res.json({
            success: false,
            error: `${error.message}`
        })
    }
}

 
// change user password
export const changeEmail = async (req, res) => {
    try {
        let { password } = req.body;

        let data = await Vendor.findById(req.user.id).select("+password");

        let matched = await bcrypt.compare(password, data.password)
        if (!matched) {
            res.status(400).json("Invalid Credintials ! please Try again latter");
            return
        }

        let { newEmail, confirmNewEmail } = req.body
        if (newEmail !== confirmNewEmail) {
            res.status(400).json("Mail is not matching ! Please try again latter");
            return
        }
        data.email = newEmail
        await data.save()
        let data_ = await Vendor.findById(req.user.id)
        res.json({ success: true, data_ })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}


// change user password
export const changePassword = async (req, res) => {
    try {
        let { currentPassword, newPassword, confirmNewPassword } = req.body;

        let data = await Vendor.findById(req.user.id).select("+password");

        let matched = await bcrypt.compare(currentPassword, data.password)
        if (!matched) {
            res.status(400).json("Invalid Credintials ! please Try again latter");
            return
        }
        if (newPassword !== confirmNewPassword) {
            res.status(400).json("password is not matching ! Please try again latter");
            return
        }
        data.password = newPassword
        await data.save()

        let data_ = await Vendor.findById(req.user.id);
        res.json({ success: true, data_ })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

