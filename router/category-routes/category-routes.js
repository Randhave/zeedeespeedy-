import express from 'express'

import { addCategory, getCategories, deleteCategoryImage, changeStatus, updateCategory, getCategory }
    from '../../controller/category-controller/category-controller.js';
import { isAuthenticated } from '../../middleware/auth.js';

import Vendor from '../../model/vendor/vendor.js';

const categoryRoutes = express.Router();


const tokenType = "vendorAccessToken"

/**s
* @swagger
*   components:
*     schemas:
*       Category:
*         type: object
*         required:
*           - name
*           - active
*         properties:
*           name:
*             type: string
*           active:
*             type: boolean
*/

/**
 * @swagger
 * tags:
 *  name: category-controller
 */


// add category
/**
 * @swagger
 * /category/:
 *  post:
 *    summary: add category (only access for vendor)
 *    tags: [category-controller] 
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *    responses:
 *      '200':
 *        description: Successful fetched
 *      '400': 
 *          description : cannot add new category 
 */
categoryRoutes.post("/", isAuthenticated(Vendor, tokenType), addCategory)  

// get all categories
/**
 * @swagger
 * /category/:
 *  get:
 *    summary: get all categories
 *    tags: [category-controller] 
 *    responses:
 *      '200': 
 *          description: A successfull response
 *      '401': 
 *          description : Unauthorized No token provided ! Please login
 * 
 */
categoryRoutes.get("/", isAuthenticated(Vendor, tokenType), getCategories)

// update category
/**
 * @swagger
 * /category/{categoryId}:
 *  put:
 *    summary : update category 
 *    tags: [category-controller] 
 *    parameters:
 *      - in: path
 *        name: categoryId
 *        schema:
 *          type: string  
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *               $ref: '#/components/schemas/Category'
 * 
 *    responses :
 *      '200' : 
 *          description : Successfully updated user details
 * 
 */
categoryRoutes.put("/:categoryId", isAuthenticated(Vendor, tokenType), updateCategory);

// get category
/**
 * @swagger
 * /category/{categoryId}:
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
categoryRoutes.get("/:categoryId", isAuthenticated(Vendor, tokenType), getCategory);

// change category status
/**
 * @swagger
 * /category/status/{categoryId}:
 *  put:
 *    summary: change category status
 *    tags: [category-controller] 
 *    parameters:
 *      - in: path
 *        name: categoryId
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
categoryRoutes.put("/status/:categoryId", isAuthenticated(Vendor, tokenType), changeStatus); 

// delete category img
// /**
//  * @swagger
//  * /category/image/{categoryId}:
//  *  delete:
//  *    summary: delete category img
//  *    tags:  [category-controller] 
//  *    responses :
//  *      '200' : 
//  *          description : Successfully deleted category img
//  * 
//  */
categoryRoutes.get("/image/:categoryId", isAuthenticated(Vendor, tokenType), deleteCategoryImage);

export default categoryRoutes