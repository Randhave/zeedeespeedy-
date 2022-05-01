import Customer from "../../model/customer/customer.js"
import ApiFeatures from "../../utils/apiFeatures.js";

import { sendEmail } from '../../utils/sendEmail.js'


// create new customer
export const newCustomer = async (req, res) => {
    try {
        let { firstName, lastName, email, password, phoneNumber, birthDate, registeredVia, gender } = req.body
        if (!firstName || !lastName || !email || !password || !phoneNumber || !birthDate || !registeredVia || !gender) {
            res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        }

        let user = await Customer.find({ email: email })
        console.log("user from customer-controller ", user && user);
        if (user && user.emailVerified === true) {
            res.status(400).json({
                success: false,
                message: "User already exist try other email"
            })
            return
        }

        let data = await new Customer(req.body).save();

        // res.status(200).json({
        //     success: true,
        //     data,
        //     message: "Customer created successfully",
        //     status: 200
        // })

        const varifyToken = await data.generateTokenForVarifyCustomer();
        const varifyOTP = await data.generateOTP()

        await data.save({ validateBeforeSave: false })

        console.log("otp ", varifyOTP)
      
        const varifyUserUrl = `https://zeedeespeed.herokuapp.com/user/login/varify/email/url/${varifyToken}`
        // const varifyUserUrl = `${req.protocol}://${req.get("host")}/user/login/varify/email/url/${varifyToken}`
        // https://zeedeespeed.herokuapp.com/
        // const varifyUserUrl = `http://localhost:4000/user/login/varify/email/url/${varifyToken}`

        const varifyUserOTP = `https://zeedeespeed.herokuapp.com/user/login/varify/email/otp/${varifyOTP}`
        // const varifyUserOTP = `${req.protocol}://${req.get("host")}/user/login/varify/email/otp/${varifyOTP}`

        const message = `Thank you for registering with Doosy. To complete your registration with Doosy, 
                        please verify your email address by clicking the link below.
                        \n\n ${varifyUserUrl}\n\n 
                        You can verify the email using OTP. The OTP for verifying your email is\n\n\n
                        ${varifyUserOTP}
                       \n\n
        Thanks and Regards,
         Doosy Customer support team
         Customer Care No: 9179299685
         Email address: support@doosy.in `

        await sendEmail({
            email: data.email,
            subject: "Email Verification alert!",
            message
        })
        res.status(200).json({
            success: true,
            emailMessage: `Email sent to ${data.email} successfully for varify user`,
            data,
            message: "Customer created successfully",
            status: 200
        })


    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}
// get customer details by customerId
export const getCustomerInfo = async (req, res) => {
    try {
        let customerId = req.params.customerId
        let data = await Customer.findById(customerId)

        res.status(200).json({
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

// update customer details by customerId
export const updateCustomerInfo = async (req, res) => {
    try {
        let customerId = req.params.customerId
        let data = await Customer.findByIdAndUpdate(customerId, { $set: req.body })
        await data.save()
        let data_ = await Customer.findById(customerId);
        res.status(200).json({
            success: true,
            data_
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// change customer status
export const changeCustomerStatus = async (req, res) => {
    try {
        let customerId = req.params.customerId
        let data = await Customer.findById(customerId);
        let { status } = req.body
        console.log("status ", status);
        if (data) {
            data.active = status;
            await data.save()
        }
        console.log("user ", data);
        let data_ = await Customer.findById(customerId);
        res.status(200).json({
            success: true,
            data_
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// get customer list
export const allCustomer = async (req, res) => {
    try {
        let totalCustomer = Customer.countDocuments
        // let data = await Customer.find();
        // res.status(200).json({
        //     success: true,
        //     data,
        //     totalCustomer
        // })

        const apiFeatures = new ApiFeatures(Customer.find(), req.query).search().pagination(req.query.pageNumber, req.query.pagesSize);
        let customers = await apiFeatures.query
        let resultPerPage = req.query.pagesSize
        res.status(200).json({ success: true, customers, resultPerPage, totalCustomer })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// delete the customer by customerId
export const deleteCustomer = async (req, res) => {
    try {
        await Customer.findById(req.params.customerId);
        res.status(200).json({
            success: true,
            message: "user deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}


/// get customer wallet info
export const getCustomerWalletBalance = async (req, res) => {
    try {
        let data = await Customer.findById(req.params.customerId);
        res.status(200).json({
            success: true,
            data: {
                amount: data.walletAmt
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}