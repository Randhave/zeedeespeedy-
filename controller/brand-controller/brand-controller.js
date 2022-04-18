import Brand from "../../model/brand/Brand.js"
import ApiFeatures from "../../utils/apiFeatures.js";

// add new brand
export const addBrand = async (req, res) => {
    try {
        let data = await new Brand(req.body).save();
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

// get brand details
export const getBrand = async (req, res) => {
    try {
        let data = await Brand.findById(req.params.brandId)
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

// update brand details
export const updateBrand = async (req, res) => {
    try {
        await Brand.findByIdAndUpdate(req.params.brandId, { $set: req.body })

        let data = await Brand.findById(req.params.brandId)
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

// change brand status 
export const changeStatus = async (req, res) => {
    try {
        let data = await Brand.findById(req.params.brandId);

        let { status } = req.body;
        data.active = status
        data.save()

        let data_ = await Brand.findById(req.params.brandId)
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

// get brand list
export const allBrand = async (req, res) => {
    try {
        // let data = await Brand.find();
        // res.status(200).json({
        //     success: true,
        //     data
        // })

        const totalBrands = await Brand.countDocuments();
        const apiFeatures = new ApiFeatures(Brand.find(), req.query).brandSearch().pagination(req.query.pageNumber, req.query.pagesSize);

        let brands = await apiFeatures.query
        let resultPerPage = req.query.pagesSize
        res.status(200).json({ success: true, brands, totalBrands, resultPerPage })


    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}
