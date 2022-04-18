import Product from "../../model/product/product.js"

// add new product
export const addProduct = async (req, res) => {
    try {
        let ref = {
            vendorId: req.user._id,
            vendorFristName: req.user.firstName,
            vendorLastName: req.user.lastName
        }
        req.body.vendor = ref
        let data = await new Product(req.body).save()
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

// get proudct details
export const getProductDetails = async (req, res) => {
    try {
        let data = await Product.findById(req.params.productId);
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

// update product details
export const updateProductDetails = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.productId, { $set: req.body });
        let data = await Product.findById(req.params.productId)
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

// get all product
export const getProductList = async (req, res) => {
    try {
        let data = await Product.find();
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