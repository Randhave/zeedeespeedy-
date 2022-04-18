import Cuisine from "../../model/cuisine/cuisine.js"

// add cuisine 
export const addcuisine = async (req, res) => {
    try {

        let pic = {
            public_id: "This is the public_id",
            url: "This is the image url"
        }
        req.body.image = pic
        let data = await Cuisine(req.body).save();
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

// get cuisine details
export const getCuisine = async (req, res) => {
    try {
        let data = await Cuisine.findById(req.params.cuisineId);
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

// update cuisine datails
export const updateCuisineDetails = async (req, res) => {
    try {
        await Cuisine.findByIdAndUpdate(req.params.cuisineId, { $set: req.body })
        let data = await Cuisine.findById(req.params.cuisineId);

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

// get all cuisine list
export const cuisineList = async (req, res) => {
    try {
        let data = await Cuisine.find();
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

// change status
export const changeStatus = async (req, res) => {
    try {
        let data = await Cuisine.findById(req.params.cuisineId);
        let { status } = req.body;
        if (status) {
            data.active = status
        }
        await data.save();
        let data_ = await Cuisine.findById(req.params.cuisineId);
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

// delete cuisine
export const deleteCuisine = async (req,res) => {
    try {
        await Cuisine.findByIdAndDelete(req.params.cuisineId);
        res.status(200).json({
            success : true,
            message : "Cuisine deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}