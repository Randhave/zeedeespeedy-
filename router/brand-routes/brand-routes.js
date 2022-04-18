import express from 'express'
import { addBrand, allBrand, getBrand, updateBrand, changeStatus } from '../../controller/brand-controller/brand-controller.js';

const brandRoutes = express.Router();

// add new brand
brandRoutes.post("/", addBrand)

// get all brand
brandRoutes.get("/all", allBrand)

// get brand details by brandId
brandRoutes.get("/:brandId", getBrand)

// update brand details
brandRoutes.put("/:brandId", updateBrand)

// update brand status
brandRoutes.put("/status/:brandId", changeStatus)

//----> pending
// // export list
// brandRoutes.get("/export/list")

// // import data
// brandRoutes.post("/upload")


export default brandRoutes