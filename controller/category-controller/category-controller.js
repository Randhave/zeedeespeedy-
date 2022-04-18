import Category from "../../model/category/category.js"
import ApiFeatures from "../../utils/apiFeatures.js";

// add category
export const addCategory = async (req, res) => {
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
        req.body.vendorId = req.user._id

        let data = await new Category(req.body).save()

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

// update category
export const updateCategory = async (req, res) => {
    try {
        let oldCategory = await Category.findById(req.params.categoryId)
        let newImg = req.body.image
        if (newImg || newImg !== undefined) {
            let oldImg = oldCategory.image.public_id;
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
            // oldCategory = req.body
            req.body.image = pic;
        }
        await Category.findByIdAndUpdate(req.params.categoryId, { $set: req.body })
        let data = await Category.findById(req.params.categoryId)
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

// change category status 
export const changeStatus = async (req, res) => {
    try {
        let category = await Category.findById(req.params.categoryId);
        let { status } = req.body.status
        category.active = status;
        await category.save()
        let data = await Category.findById(req.params.categoryId);
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

// get category details
export const getCategory = async (req, res) => {
    try {
        let data = await Category.findById(req.params.categoryId);
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


// get all category by passing params
export const getCategories = async (req, res) => {
    try {
        const apiFeatures = new ApiFeatures(Category.find(), req.query).buisnessCategorySearch().pagination(req.query.pageNumber, req.query.pagesSize);
        let categories = await apiFeatures.query
        let resultPerPage = req.query.pagesSize
        res.status(200).json({ success: true, categories, resultPerPage })

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

// delete category image
export const deleteCategoryImage = async (req, res) => {
    try {
        let data = await Category.findById(req.params.categoryId);
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