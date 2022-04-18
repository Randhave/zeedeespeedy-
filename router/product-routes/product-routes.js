import express from 'express';
import { addProduct, getProductDetails, getProductList }
    from '../../controller/product-controller/product-controller.js';
import { isAuthenticated } from '../../middleware/auth.js';
import Vendor from '../../model/vendor/vendor.js';

const productRoutes = express.Router();

const tokenType = "vendorAccessToken"

// add new product
productRoutes.post("/", isAuthenticated(Vendor, tokenType), addProduct);

// get product details
productRoutes.get("/:productId", isAuthenticated(Vendor, tokenType), getProductDetails);

// get product list
productRoutes.get("/", isAuthenticated(Vendor, tokenType), getProductList)

export default productRoutes