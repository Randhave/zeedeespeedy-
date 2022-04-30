import express from 'express';
import { addcuisine, updateCuisineDetails, getCuisine, cuisineList, deleteCuisine }
    from '../../controller/cuisine-controller/cuisine-controller.js';
import { isAuthenticated } from '../../middleware/auth.js';
import Vendor from '../../model/vendor/vendor.js';

const cuisineRoutes = express.Router();

const tokenType = "vendorAccessToken"

/**
 * @swagger
 * tags:
 *  name: cuisine-controller
 */


// add cuisine
cuisineRoutes.post("/", isAuthenticated(Vendor, tokenType), addcuisine)

// cuisine list
cuisineRoutes.get("/", isAuthenticated(Vendor, tokenType), cuisineList)

// get cuisine details
cuisineRoutes.get("/:cuisineId", isAuthenticated(Vendor, tokenType), getCuisine);

// update cuisine
cuisineRoutes.put("/cuisineId", isAuthenticated(Vendor, tokenType), updateCuisineDetails)

// delete cuisine
cuisineRoutes.delete("/:cuisineId", isAuthenticated(Vendor, tokenType), deleteCuisine)

export default cuisineRoutes