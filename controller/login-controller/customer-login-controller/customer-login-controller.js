
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import Customer from '../../../model/customer/customer.js';
import sendToken from "../../../utils/jwtToken.js";
import { sendEmail } from '../../../utils/sendEmail.js'


// customer login 
export const customerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Invalid credentials")
        }

        const user = await Customer.findOne({ email: email }).select("+password");
        if (!user) {
            throw new Error("Invalid credentials ! please Try again latter")
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        console.log("user password is matched ............", isPasswordMatch);
        if (!isPasswordMatch) {
            throw new Error("Invalid credentials ! please Try again latter")
        };
        console.log("user from customer login ", user);
        if (user.emailVerified === true && user.status === "Active") {
            sendToken(user, "customerAccessToken", res)
        }
        else {
            res.status(400).json({
                success: false,
                message: `User is not activated for email : ${user.email}`
            })
        }

    } catch (error) {
        return res.json({ success: false, message: `${error.message}` });
    }
}

// logout login user
export const customerLogut = async (req, res) => {
    try {
        res.cookie("customerAccessToken", null, {
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

// get user info
export const customerLoginInfo = async (req, res) => {
    try {
        let data = await Customer.findById(req.user.id);
        res.json({
            success: true,
            data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// change user password
export const changeEmail = async (req, res) => {
    try {
        let { password } = req.body;

        let data = await Customer.findById(req.user.id).select("+password");

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
        let data_ = await User.findById(req.user.id)
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

        let data = await Customer.findById(req.user.id).select("+password");

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

        let data_ = await User.findById(req.user.id);
        res.json({ success: true, data_ })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// forgot password
export const forgotPassword = async (req, res) => {
    const user = await Customer.findOne({ email: req.body.email })
    if (!user) {
        res.status(404).json("User not found | Enter a valid email | Enter a registered email");
        return
    }
    try {

        // get resetToken
        const resetToken = await user.generateTokenForResetPassword();

        await user.save({ validateBeforeSave: false })

        // for production
        // const resetpasswordUrl = `${req.protocol}://${req.get("host")}/password/resetpassword/${resetToken}`  

        // for devlopment
        // const resetpasswordUrl = `${process.env.FRONT_END_PORT}/resetpassword/${resetToken}`
        const resetpasswordUrl = `http://localhost:4000/api/v1/user/login/resetpassword/${resetToken}`

        const message = `Your password reset token is right now :-- \n\n ${resetpasswordUrl}\n\n If you are not requested this email ! then please ignore it`

        await sendEmail({
            email: user.email,
            subject: "Doosy web service password recovery",
            message
        })
        res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully` })

    } catch (error) {
        user.resetpasswordToken = undefined;
        user.resetpasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })

        res.status(404).json({ success: false, error: `${error.message}` })
    }
}

// resetPassword
export const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const resetpasswordToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await Customer.findOne({ resetpasswordToken, resetpasswordExpire: { $gt: Date.now() } })
        if (!user) {
            res.status(400).json("Reset password token is invalid or has been expired");
            return
        }

        if (req.body.password !== req.body.confirmPassword) {
            res.status(400).json("password is not matching ! Please try again latter")
            return
        }

        user.password = req.body.password;  // changed the password

        user.resetpasswordToken = undefined;
        user.resetpasswordExpire = undefined;
        await user.save()

        // sendToken(user, 200, res)
        res.status(200).json({ success: true, message: `user password successfully changed` });

    } catch (error) {
        res.status(501).json({ success: false, error: `${error.message}` })
    }
}

// varify customer by email

// varify customer
export const varifyCustomerByURL = async (req, res) => {
    try {

        const token = req.params.token;
        const varifyCustomerToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await Customer.findOne({ varifyCustomerToken, resetCustomerTokenExpire: { $gt: Date.now() } })
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Invalid url"
            })
        }
        user.emailVerified = true
        user.status = "Active"
        user.resetCustomerTokenExpire = undefined
        user.varifyCustomerToken = undefined
        user.varifyCustomerOTP = undefined
        user.varifyCustomerOTPExpire = undefined

        user.save()
        res.status(200).json({
            success: true,
            user
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// varigy customer by phoneNumber
export const varifyCustomerByOTP = async (req, res) => {
    try {
        let { otp } = req.body
        let user = await Customer.findOne({ varifyCustomerOTP: otp })
        if (user.varifyCustomerOTP === otp) {
            user.emailVerified = true
            user.status = "Active"
            user.resetCustomerTokenExpire = undefined
            user.varifyCustomerToken = undefined
            user.varifyCustomerOTP = undefined
            user.varifyCustomerOTPExpire = undefined

            user.save()

            res.status(200).json({
                success: true,
                user
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "Invalid OTP"
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}