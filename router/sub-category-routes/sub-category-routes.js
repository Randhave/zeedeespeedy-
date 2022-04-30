import express from 'express'
import { addsubCategory, changeStatus, deletesubCategoryImage, getsubCategories, getsubCategory, updatesubCategory }
    from '../../controller/sub-category-controller/sub-category-controller.js';
import { isAuthenticated } from '../../middleware/auth.js';
import Customer from '../../model/customer/customer.js';
import Vendor from '../../model/vendor/vendor.js';

const subCategoryRoutes = express.Router();


const tokenType = "vendorAccessToken"

/**s
* @swagger
*   components:
*     schemas:
*       subCategory:
*         type: object
*         required:
*           - name
*           - active
*           - categoryId
*         properties:
*           categoryId:
*             type: string
*             required: true
*           name:
*             type: string
*           active:
*             type: boolean
*/

/**
 * @swagger
 * tags:
 *  name: sub-category-controller
 */


// add sub-category
/**
 * @swagger
 * /subcategory/:
 *  post:
 *    summary: add sub-category (only access for vendor)
 *    tags: [sub-category-controller]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/subCategory'
 *    responses:
 *      '200':
 *        description: Successful fetched
 *      '400': 
 *          description : cannot add new subCategory 
 */
subCategoryRoutes.post("/", isAuthenticated(Vendor, tokenType), addsubCategory)

// update sub-category
/**
 * @swagger
 * /subcategory/{subCategoryId}:
 *  put:
 *    summary : update  sub-category 
 *    tags: [sub-category-controller]
 *    parameters:
 *      - in: path
 *        name: subCategoryId
 *        schema:
 *          type: string  
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *               $ref: '#/components/schemas/subCategory'
 * 
 *    responses :
 *      '200' : 
 *          description : Successfully updated sub-categorys
 * 
 */
subCategoryRoutes.put("/:subCategoryId", isAuthenticated(Vendor, tokenType), updatesubCategory)

// change status
/**
 * @swagger
 * /subcategory/status/{subCategoryId}:
 *  put:
 *    summary: change sub-category status
 *    tags: [sub-category-controller] 
 *    parameters:
 *      - in: path
 *        name: subCategoryId
 *        schema:
 *          type: string  
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    status:
 *                       type: string
 *  
 *    responses :
 *      '200' : 
 *          description : Successfully changed the user status
 * 
 */
subCategoryRoutes.put("/status/:subCategoryId", isAuthenticated(Vendor, tokenType), changeStatus)

// get sub-category details
/**
 * @swagger
 * /subcategory/{subCategoryId}:
 *  get:
 *    summary: get category
 *    tags: [category-controller] 
 *    parameters:
 *      - in: path
 *        name: categoryId
 *        schema:
 *          type: string     
 *    responses:
 *       '200':
 *         description: A single user
 */
subCategoryRoutes.get("/:subCategoryId", isAuthenticated(Vendor, tokenType), getsubCategory);

// get all sub categories
subCategoryRoutes.get("/", isAuthenticated(Vendor, tokenType), getsubCategories)

// delete sub-category img
subCategoryRoutes.delete("/image/:subCategoryId", isAuthenticated(Vendor, tokenType), deletesubCategoryImage)

export default subCategoryRoutes