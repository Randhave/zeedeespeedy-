import express from 'express'
import { addBuinessCategory, getList, updateBuisnessCategory, updateStatus, updateManageInventory, getBuisnessCategory }
    from '../../controller/business-category-controller/business-category-controller.js'
import { isAuthenticated } from '../../middleware/auth.js'
import Vendor from '../../model/vendor/vendor.js'
const buisnessCategoryRoutes = express.Router()


const tokenType = "vendorAccessToken"

/**
* @swagger
*   components:
*     schemas:
*       Buisness:
*         type: object
*         required:
*           - name
*           - active
*           - restaurantType
*           - comissionRate
*         properties:
*           name:
*             type: string
*           active:
*             type: boolean
*           restaurantType:
*             type: boolean
*           comissionRate:
*             type: integer
*/

/**
 * @swagger
 * tags:
 *  name: buisness-category-controller
 */

// add buisness category
/**
 * @swagger
 * /business/category/:
 *  post:
 *    summary : add buisness category (only access for vendor)
 *    tags: [buisness-category-controller] 
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Buisness'
 *    responses:
 *      '200':
 *        description: Successful fetched
 *      '400': 
 *          description : cannot add new buisness category 
 */
buisnessCategoryRoutes.post("/", isAuthenticated(Vendor, tokenType), addBuinessCategory)

// get list of buisness category
/**
 * @swagger
 * /business/category/:
 *  get:
 *    summary: get list of buisness category   (only access for vendor)
 *    tags: [buisness-category-controller] 
 *    responses:
 *      '200':  
 *          description: A successfull response
 *      '401': 
 *          description : Unauthorized No token provided ! Please login
 * 
 */
buisnessCategoryRoutes.get("/", isAuthenticated(Vendor, tokenType), getList)

// update buisness cateogory
/**
 * @swagger
 * /business/category/{businessCategoryId}:
 *  put:
 *    summary : update buisness cateogory  (only access for vendor)
 *    tags: [buisness-category-controller] 
 *    parameters:
 *      - in: path
 *        name: businessCategoryId
 *        schema:
 *          type: string  
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *               $ref: '#/components/schemas/Buisness'
 * 
 *    responses :
 *      '200' : 
 *          description : Successfully updated brand details
 * 
 */
buisnessCategoryRoutes.put("/:businessCategoryId", isAuthenticated(Vendor, tokenType), updateBuisnessCategory)

// update buisness category status
/**
 * @swagger
 * /business/category/status/{businessCategoryId}:
 *  put:
 *    summary : update buisness cateogory  (only access for vendor)
 *    tags: [buisness-category-controller] 
 *    parameters:
 *      - in: path
 *        name: businessCategoryId
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
 *                       type: boolean
 *  
 *    responses :
 *      '200' : 
 *          description : Successfully updated brand details
 * 
 */
buisnessCategoryRoutes.put("/status/:businessCategoryId", isAuthenticated(Vendor, tokenType), updateStatus)

// update restaurantType status
/**
 * @swagger
 * /business/category/status/{businessCategoryId}:
 *  put:
 *    summary : update restaurantType status (only access for vendor)
 *    tags: [buisness-category-controller] 
 *    parameters:
 *      - in: path
 *        name: businessCategoryId
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
 *                       type: boolean
 *  
 *    responses :
 *      '200' : 
 *          description : Successfully updated brand details
 * 
 */
buisnessCategoryRoutes.put("/restaurant/type/:businessCategoryId", isAuthenticated(Vendor, tokenType), updateManageInventory)

// get buisness category
/**
 * @swagger
 * /business/category/{businessCategoryId}:
 *  get:
 *    summary :  get buisness category
 *    tags: [buisness-category-controller]
 *    parameters:
 *      - in: path
 *        name: businessCategoryId
 *        schema:
 *          type: string     
 *    responses:
 *       '200':
 *         description: A single user
 *       '401': 
 *          description : Unauthorized No token provided ! Please login
 * 
 */
buisnessCategoryRoutes.get("/:businessCategoryId", isAuthenticated(Vendor, tokenType), getBuisnessCategory)

export default buisnessCategoryRoutes
