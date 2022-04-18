import CustomerAddress from "../../model/customer-address/customer-address.js"
import Customer from "../../model/customer/customer.js";
import mongoose from "mongoose";
import ApiFeatures from "../../utils/apiFeatures.js";
// add customer address
export const addCustomersAddress = async (req, res) => {
    try {
        req.body.customerId = req.user._id
        
        let data = await new CustomerAddress(req.body).save();
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

// update customer address
export const updateCustomerAddress = async (req, res) => {
    try {
        // find get customer data 
        let customerData = await Customer.findById(req.user._id);
        res.status(200).json({
            success: true,
            customerData
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// get customer address
export const getCustomerAddress = async (req, res) => {
    try {
        let data = await CustomerAddress.findById(req.params.addressId)
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

// get customer address list
export const customerAddressList = async (req, res) => {
    try {
        if (req.user._id.toString() === req.params.customerId) {
            let addressList = await CustomerAddress.find({ customerId: req.params.customerId });

          
            const apiFeatures = new ApiFeatures(CustomerAddress.find({ customerId: req.params.customerId }), req.query).search().pagination(req.query.pageNumber, req.query.pagesSize);

            let addresss = await apiFeatures.query
            let resultPerPage = req.query.pagesSize
            let totalAddress = addresss.length
            res.status(200).json({
                success: true,
                addresss, totalAddress,
                resultPerPage
            })


            // res.status(200).json({
            //     success: true,
            //     addressList
            // })
        } else {
            res.status(404).json({
                success: false,
                message: "Please login to your get address list"
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// change customer address status
// export const changeStatus = async (req,res) => {
//     try {
//         let data = await CustomerAddress.findById(req.params.customerAddressId)
//         res.status(200).json({
//             success: true,
//             data
//         })
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             error: `${error.message}`
//         })
//     }
// }

// update customer default address
export const updateDefaultCustomerddress = async (req, res) => {
    try {
        let data = await CustomerAddress.findById(req.params.addressId)
        if (data.defaultAddress === true) {
            await CustomerAddress.findByIdAndUpdate(req.params.addressId, { $set: req.body })
            let data_ = await CustomerAddress.findById(req.params.addressId)
            res.status(200).json({
                success: true,
                data_
            })
        } else {
            res.status(404).json({
                success: false,
                message: "This address is not your default address"
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// get address list of all customer
export const addressList = async (req, res) => {
    console.log("addressList api   run");
    try {
        let data = await CustomerAddress.find();
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        console.log("error in addressList ",error);
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}