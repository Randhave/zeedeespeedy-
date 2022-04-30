import express from 'express'
import { addVendor, getAllVendorsList, updatePersonalDetails, getVendorBasicDetails, changeStatus }
    from '../../controller/vendor-controller/vendor-controller.js';
import { isAuthenticated } from '../../middleware/auth.js';
import Vendor from '../../model/vendor/vendor.js';

const vendorRoutes = express.Router();

const tokenType = "vendorAccessToken"

/**s
* @swagger
*   components:
*     schemas:
*       Vendor:
*         type: object
*         required:
*           - firstName
*           - lastName
*           - email
*           - password
*           - phoneNumber
*           - buildingName
*           - businessCategoryId
*           - cityId
*           - countryId
*           - buildingName
*           - landmark
*           - latitude
*           - longitude
*           - pincodeId
*           - storeName
*           - streetNo
*           - stateId
*         properties:
*           firstName:
*             type: string
*           lastName:
*             type: string
*           email:
*             type: string
*           password:
*             type: string
*           buildingName:
*             type: string
*           businessCategoryId:
*             type: string
*           cityId:
*             type: integer
*           countryId:
*             type: integer
*           landmark:
*             type: string
*           latitude:
*             type: string
*           longitude:
*             type: string
*           pincodeId:
*             type: integer
*           phoneNumber:
*             type: integer
*           storeName:
*             type: string
*           streetNo:
*             type: string
*           stateId:
*             type: integer
*           sunday:
*             type: boolean
*             description: default value is false, but vendor required to set any one value is true of 7 days
*             default: false 
*           monday:
*             type: boolean
*             description: default value is false, but vendor required to set any one value is true of 7 days 
*             default: false
*           tuesday:
*             type: boolean
*             description: default value is false, but vendor required to set any one value is true of 7 days 
*             default: false
*           wednesday:
*             type: boolean
*             description: default value is false, but vendor required to set any one value is true of 7 days 
*             default: false
*           thursday:
*             type: boolean
*             description: default value is false, but vendor required to set any one value is true of 7 days 
*             default: false
*           friday:
*             type: boolean
*             description: default value is false, but vendor required to set any one value is true of 7 days 
*             default: false
*           saturday:
*             type: boolean
*             description: default value is false, but vendor required to set any one value is true of 7 days 
*             default: false
*/

/**
 * @swagger 
 * tags:
 *  name: vendor-controller
 */

// add vendor
/**
 * @swagger
 * /vendor/:
 *  post:
 *    summary : add vendor / signup 
 *    tags: [vendor-controller]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Vendor'
 *    responses:
 *      '200':
 *        description: Successful fetched
 *      '400': 
 *          description : cannot add new vendor 
 */
vendorRoutes.post("/", addVendor);

// get all vendor list
/**
 * @swagger
 * /vendor/:
 *  get:
 *    summary: return all vendors
 *    tags: [vendor-controller]
 *    responses:
 *      '200': 
 *          description: A successfull response
 *      '401': 
 *          description : Unauthorized No token provided ! Please login
 * 
 */
vendorRoutes.get("/", getAllVendorsList) 

// update vendor details
/**
 * @swagger
 * /vendor/{vendorId}:
 *  put:
 *    summary : update vendor details
 *    tags: [vendor-controller]
 *    parameters:
 *      - in: path
 *        name: vendorId
 *        schema:
 *          type: string  
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *               $ref: '#/components/schemas/Vendor'
 * 
 *    responses :
 *      '200' : 
 *          description : Successfully updated user details
 * 
 */
vendorRoutes.put("/:vendorId", isAuthenticated(Vendor, tokenType), updatePersonalDetails)

// get vondor app details
// vendorRoutes.get("/app/detail/:vendorId", getVendorCustomerDetails)

// update vendor bank details
// vendorRoutes.put("/bank/details/", updateVendorBankDetails);

// get venodr bank details
// vendorRoutes.get("/bank/details/:vendorId", getVendorBankDetails);

// get vendor basic details
/**
 * @swagger
 * /vendor/basic/{vendorId}:
 *  get:
 *    summary:  get vendor basic details
 *    tags: [vendor-controller]
 *    parameters:
 *      - in: path
 *        name: vendorId
 *        schema:
 *          type: string
 *    responses:
 *       '200':
 *         description: successfully fetched data
 */
vendorRoutes.get("/basic/:vendorId", isAuthenticated(Vendor, tokenType), getVendorBasicDetails);

// change vendor status
// vendorRoutes.put("/change/status/:vendorId/:newStatus", changeVendorStatus)

// export vendor list
// vendorRoutes.post("/export/list", exportList)

// change stastus of its feauture product
// vendorRoutes.put("/featured/:vendorId", changeStatusofFeatureProduct)

// delete vendor image
vendorRoutes.delete("/image/:vendorId")

// update restaurant details
// vendorRoutes.put("/restaurant/details", updateRestaurantDetails);

// change vendor status
/**
 * @swagger
 * /vendor/change/status/{vendorId}/{newStatus}:
 *  put:
 *    summary:  change vendor status
 *    tags: [vendor-controller]
 *    parameters:
 *      - in: path
 *        name: vendorId
 *        schema:
 *          type: string
 *      - in: path
 *        name: newStatus
 *        schema:
 *          type: boolean
 *    responses:
 *       '200':
 *         description: successfully fetched data
 */
vendorRoutes.put("/change/status/:vendorId/:newStatus", isAuthenticated(Vendor, tokenType), changeStatus)

// get vendor
/**
 * @swagger
 * /vendor/{vendorId}:
 *  get:
 *    summary:  get vendor details
 *    tags: [vendor-controller]
 *    parameters:
 *      - in: path
 *        name: vendorId
 *        schema:
 *          type: string
 *    responses:
 *       '200':
 *         description: successfully fetched data
 */
vendorRoutes.get("/:vendorId", isAuthenticated(Vendor, tokenType), getVendorBasicDetails)

export default vendorRoutes