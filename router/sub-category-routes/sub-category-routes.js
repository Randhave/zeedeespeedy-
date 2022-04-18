import express from 'express'
import { addsubCategory, changeStatus, deletesubCategoryImage, getsubCategories, getsubCategory, updatesubCategory }
    from '../../controller/sub-category-controller/sub-category-controller.js';
import { isAuthenticated } from '../../middleware/auth.js';
import Customer from '../../model/customer/customer.js';
import Vendor from '../../model/vendor/vendor.js';

const subCategoryRoutes = express.Router();


const tokenType = "vendorAccessToken"

// add category
subCategoryRoutes.post("/", isAuthenticated(Vendor, tokenType), addsubCategory)

// update sub-category
subCategoryRoutes.put("/:subCategoryId", isAuthenticated(Vendor, tokenType), updatesubCategory)

// change status
subCategoryRoutes.put("/status/:subCategoryId", isAuthenticated(Vendor, tokenType), changeStatus)

// get sub-category details
subCategoryRoutes.get("/:subCategoryId", isAuthenticated(Vendor, tokenType), getsubCategory);

// get all sub categories
subCategoryRoutes.get("/", isAuthenticated(Vendor, tokenType), getsubCategories)

// delete sub-category img
subCategoryRoutes.delete("/image/:subCategoryId", isAuthenticated(Vendor, tokenType), deletesubCategoryImage)

export default subCategoryRoutes