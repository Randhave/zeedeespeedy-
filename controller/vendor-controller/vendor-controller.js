import Vendor from "../../model/vendor/vendor.js"
import ApiFeatures from "../../utils/apiFeatures.js"

// add vendor 
export const addVendor = async (req, res) => {
    try {
        let data = await Vendor(req.body).save()
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

// get all vondors
export const getAllVendorsList = async (req, res) => {
    try {
        let data = await Vendor.find()
        res.status(200).json({
            success: true,
            data
        })

        // const totalVendors = await Vendor.countDocuments();
        // const apiFeatures = new ApiFeatures(Vendor.find(), req.query).search().pagination(req.query.pageNumber, req.query.pagesSize);

        // let vendors = await apiFeatures.query
        // let resultPerPage = req.query.pagesSize
        // res.status(200).json({
        //     success: true,
        //     vendors,
        //     totalVendors,
        //     resultPerPage
        // })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// get vendor basic detail
export const getVendorBasicDetails = async (req, res) => {
    try {
        let data = await Vendor.findById(req.params.vendorId)
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
// update vendor personal detials
export const updatePersonalDetails = async (req, res) => {
    try {
        await Vendor.findByIdAndUpdate(req.params.vendorId, { $set: req.body })
        let data = await Vendor.findById(req.params.vendorId)
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
// change vendor status
export const changeStatus = async (req, res) => {
    try {
        let data = await Vendor.findById(req.params.vendorId);
        let newStatus = req.params.newStatus
        if (newStatus) {
            data.active = newStatus
        }
        await data.save();
        let data_ = await Vendor.findById(req.params.vendorId);
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

// update vendor app detail
// update bank details 