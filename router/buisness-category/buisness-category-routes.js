import express from 'express'
import { addBuinessCategory, getList, updateBuisnessCategory, updateStatus, updateManageInventory, getBuisnessCategory }
    from '../../controller/business-category-controller/business-category-controller.js'
const buisnessCategoryRoutes = express.Router()

// add buisness category
buisnessCategoryRoutes.post("/",  addBuinessCategory)

// get list of buisness category
buisnessCategoryRoutes.get("/", getList)

// update buisness cateogory
buisnessCategoryRoutes.put("/:businessCategoryId", updateBuisnessCategory)

// update buisness category status
buisnessCategoryRoutes.put("/status/:businessCategoryId", updateStatus)

// update restaurantType status
buisnessCategoryRoutes.put("/restaurant/type/:businessCategoryId", updateManageInventory)

// get buisness category 
buisnessCategoryRoutes.get("/:businessCategoryId", getBuisnessCategory)

export default buisnessCategoryRoutes
