import buisnessCategory from "../../model/buisness-category/buisness-category.js"
import ApiFeatures from "../../utils/apiFeatures.js";

export const addBuinessCategory = async (req, res) => {
    try {
        let { name, active, isDefault, restaurantType, comissionRate } = req.body
        if (!name || !active || !isDefault || !restaurantType || !comissionRate) {
            res.status(500).json({ success: false, message: "All field are required" })
        }
        else {

            // let file = req.files.image
            let file = req.body.image
            console.log("using files ", file);

            const result = await cloudinary.v2.uploader.upload(file, {
                folder: "doosy-web-service",
                width: 150,
                crop: "scale",
                resource_type: "auto"
            })

            let pic = {
                public_id: result.public_id,
                url: result.secure_url
            }

            req.body.image = pic

            let data = await new buisnessCategory(req.body).save();

            res.status(200).json({
                success: true,
                data
            })
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// update buisness category
export const updateBuisnessCategory = async (req, res) => {
    try {
        let businessCategoryId = req.params.businessCategoryId
        let data = await buisnessCategory.findByIdAndUpdate(businessCategoryId, { $set: req.body })
        let data_ = await buisnessCategory.findById(businessCategoryId)
        res.status(200).json({
            success: true,
            data_
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// get buisness category list
export const getList = async (req, res) => {
    try {
        const apiFeatures = new ApiFeatures(buisnessCategory.find(), req.query).buisnessCategorySearch().pagination(req.query.pageNumber, req.query.pagesSize);
        let categories = await apiFeatures.query
        let resultPerPage = req.query.pagesSize
        res.status(200).json({ success: true, categories, resultPerPage })

    } catch (error) {
        res.status(404).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// change buisness category status
export const updateStatus = async (req, res) => {
    try {
        let data = await buisnessCategory.findById(req.params.businessCategoryId);
        let { status } = req.body
        data.active = status
        await data.save()
        let data_ = await buisnessCategory.findById(req.params.businessCategoryId);
        res.status(200).json({
            success: true,
            data_
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// update restarant type 
export const updateManageInventory = async (req, res) => {
    try {
        let data = await buisnessCategory.findById(req.params.businessCategoryId);
        let { status } = req.body
        data.restaurantType = status
        await data.save()
        let data_ = await buisnessCategory.findById(req.params.businessCategoryId);
        res.status(200).json({
            success: true,
            data_
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// get buisness category id
export const getBuisnessCategory = async (req, res) => {
    try {
        let data = await buisnessCategory.findById(req.params.businessCategoryId);
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error: `${error.message}`
        })
    }
}