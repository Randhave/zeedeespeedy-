
import subCategory from "../../model/sub-category/sub-category.js";
import ApiFeatures from "../../utils/apiFeatures.js";

// add subCategory
export const addsubCategory = async (req, res) => {
    try {

        let file = req.body.image
        console.log("using files ", file);
        let pic
        if (file) {
            const result = await cloudinary.v2.uploader.upload(file, {
                folder: "doosy-web-service",
                width: 150,
                crop: "scale",
                resource_type: "auto"
            })

            pic = {
                public_id: result.public_id,
                url: result.secure_url
            }
        }

        req.body.image = pic // set image

        let data = await new subCategory(req.body).save()

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

// update subCategory
export const updatesubCategory = async (req, res) => {
    try {
        let oldsubCategory = await subCategory.findById(req.params.subCategoryId)
        let newImg = req.body.image
        if (newImg || newImg !== undefined) {
            let oldImg = oldsubCategory.image.public_id;
            await cloudinary.v2.uploader.destroy(oldImg)

            const result = await cloudinary.v2.uploader.upload(newImg, {
                folder: "doosy-web-service",
                width: 150,
                crop: "scale",
                resource_type: "auto"
            })

            let pic = {
                public_id: result.public_id,
                url: result.secure_url
            }
            // oldsubCategory = req.body
            req.body.image = pic;
        }
        let data = await subCategory.findByIdAndUpdate(req.params.subCategoryId, { $set: req.body })
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

// change subCategory status 
export const changeStatus = async (req, res) => {
    try {
        let subCategory_ = await subCategory.findById(req.params.subCategoryId);
        let status = req.body.status
        subCategory_.active = status;
        await subCategory_.save()
        let data = await subCategory.findById(req.params.subCategoryId);
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

// get subCategory details
export const getsubCategory = async (req, res) => {
    try {
        let data = await subCategory.findById(req.params.subCategoryId);
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


// get all subCategory by passing params
export const getsubCategories = async (req, res) => {
    try {
        // const apiFeatures = new ApiFeatures(subCategory.find(), req.query).buisnesssubCategorySearch().pagination(req.query.pageNumber, req.query.pagesSize);
        // let categories = await apiFeatures.query
        // let resultPerPage = req.query.pagesSize
        // res.status(200).json({ success: true, categories, resultPerPage })

        let data = await subCategory.find();
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

// import data like file image
// export const importData = async (req, res) => {
//     try {
//         let file = req.body.file;

//         if(file || file !== undefined) {

//         }
//     } catch (error) {
//         res.status(400).json({
//             success: false,
//             error: `${error.message}`
//         })
//     }
// }

// delete subCategory image
export const deletesubCategoryImage = async (req, res) => {
    try {
        let data = await subCategory.findById(req.params.subCategoryId);
        let imgId = data.image.public_id;
        await cloudinary.v2.uploader.destroy(imgId)

        res.status(200).json({
            success: true,
            message: "deleted successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}