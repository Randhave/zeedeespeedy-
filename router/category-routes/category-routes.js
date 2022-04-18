import express from 'express'

import { addCategory, getCategories, deleteCategoryImage, changeStatus, updateCategory, getCategory }
    from '../../controller/category-controller/category-controller.js';
import { isAuthenticated } from '../../middleware/auth.js';

import Vendor from '../../model/vendor/vendor.js';

const categoryRoutes = express.Router();


const tokenType = "vendorAccessToken"

// add category
categoryRoutes.post("/", isAuthenticated(Vendor, tokenType), addCategory)

// get all categories
categoryRoutes.get("/", isAuthenticated(Vendor, tokenType), getCategories)

// update category
categoryRoutes.put("/:categoryId", isAuthenticated(Vendor, tokenType), updateCategory);

// get category
categoryRoutes.get("/:categoryId", isAuthenticated(Vendor, tokenType), getCategory);

// change category status
categoryRoutes.put("/status/:categoryId", isAuthenticated(Vendor, tokenType), changeStatus);

// delete category img
categoryRoutes.get("/image/:categoryId", isAuthenticated(Vendor, tokenType), deleteCategoryImage);

export default categoryRoutes