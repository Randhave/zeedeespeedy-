import express from 'express'
import { addBrand, allBrand, getBrand, updateBrand, changeStatus } from '../../controller/brand-controller/brand-controller.js';
import { isAuthenticated } from '../../middleware/auth.js';
import Vendor from '../../model/vendor/vendor.js';

const brandRoutes = express.Router();

const tokenType = "vendorAccessToken"

/**s
* @swagger
*   components:
*     schemas:
*       Brand:
*         type: object
*         required:
*           - Name
*           - uploadMessage
*         properties:
*           Name:
*             type: string
*           uploadMessage:
*             type: string
*/

/**
 * @swagger
 * tags:
 *  name: brand-controller
 */


// add new brand
/**
 * @swagger
 * /brand/:
 *  post:
 *    summary : add new brand (only access for vendor)
 *    tags: [brand-controller] 
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Brand'
 *    responses:
 *      '200':
 *        description: Successful fetched
 *      '400': 
 *          description : cannot add new user 
 */
brandRoutes.post("/", isAuthenticated(Vendor, tokenType), addBrand)

// get all brand
/**
 * @swagger
 * /brand/all:
 *  get:
 *    summary: get all brand
 *    tags: [brand-controller] 
 *    responses:
 *      '200': 
 *          description: A successfull response
 *      '401': 
 *          description : Unauthorized No token provided ! Please login
 * 
 */
brandRoutes.get("/all", isAuthenticated(Vendor, tokenType), allBrand)

// get brand details by brandId
/**
 * @swagger
 * /brand/{brandId}:
 *  get:
 *    summary : get brand details by brandId
 *    tags: [brand-controller]
 *    parameters:
 *      - in: path
 *        name: brandId
 *        schema:
 *          type: string     
 *    responses:
 *       '200':
 *         description: A single user
 *       '401': 
 *          description : Unauthorized No token provided ! Please login
 * 
 */
brandRoutes.get("/:brandId", isAuthenticated(Vendor, tokenType), getBrand)

// update brand details
/**
 * @swagger
 * /brand/{brandId}:
 *  put:
 *    summary :  update brand details
 *    tags: [brand-controller]
 *    parameters:
 *      - in: path
 *        name: brandId
 *        schema:
 *          type: string  
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *               $ref: '#/components/schemas/Brand'
 * 
 *    responses :
 *      '200' : 
 *          description : Successfully updated brand details
 * 
 */
brandRoutes.put("/:brandId", isAuthenticated(Vendor, tokenType), updateBrand)

// update brand status
/**
 * @swagger
 * /brand/status/{brandId}:
 *  put:
 *    summary : update brand status
 *    tags: [brand-controller]
 *    parameters:
 *      - in: path
 *        name: brandId
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
 *          description : Successfully changed the user status
 * 
 */
brandRoutes.put("/status/:brandId", isAuthenticated(Vendor, tokenType), changeStatus)

//----> pending
// // export list
// brandRoutes.get("/export/list")

// // import data
// brandRoutes.post("/upload")


export default brandRoutes