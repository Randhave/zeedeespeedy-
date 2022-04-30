import express from 'express'
import { addCustomersAddress, getCustomerAddress, addressList, updateCustomerAddress, customerAddressList, updateDefaultCustomerddress } from '../../controller/customer-address-controller/customer-address-controller.js';
import { isAuthenticated } from '../../middleware/auth.js';
import Customer from '../../model/customer/customer.js';

const customerAddressRoutes = express.Router();


const tokenType = "customerAccessToken"

/**
* @swagger
*   components:
*     schemas:
*       CustomerAddress:
*         type: object
*         required:
*           - buildingName
*           - cityId
*           - countryId
*           - firstName
*           - landmark
*           - lastName
*           - latitude
*           - longitude
*           - phoneNumber
*           - pincodeId
*           - stateId
*           - streetNo
*         properties:
*           addressOf:
*             type: string
*           buildingName:
*             type: string
*           cityId:
*             type: string
*           countryId:
*             type: string
*           firstName:
*             type: integer
*           landmark:
*             type: string
*           lastName:
*             type: string
*           latitude:
*             type: integer
*           longitude:
*             type: integer
*           phoneNumber:
*             type: integer
*           pincodeId:
*             type: integer
*           stateId:
*             type: integer
*           streetNo:
*             type: integer
*/

/**
 * @swagger
 * tags:
 *  name: customer-address-controller
 */

// add custmoer address
/**
 * @swagger
 * /customer/address/:
 *  post:
 *    summary : add custmoer address (customer must be login)
 *    tags: [customer-address-controller]   
 *    requestBody:
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CustomerAddress'
 *    responses:
 *      '200':
 *        description: Successfully fetched
 *      '400': 
 *          description : cannot add new CustomerAddress 
 */
customerAddressRoutes.post("/address", isAuthenticated(Customer, tokenType), addCustomersAddress);

// get all address list
/**
 * @swagger
 * /customer/address:
 *  get:
 *    summary: get all address list   (customer must be login)
 *    tags: [customer-address-controller] 
 *    responses:
 *      '200': 
 *          description: A successfull response
 *      '401': 
 *          description : Unauthorized No token provided ! Please login
 * 
 */
customerAddressRoutes.get("/address", isAuthenticated(Customer, tokenType), addressList)

// update custmoer address
customerAddressRoutes.put("/address", isAuthenticated(Customer, tokenType), updateCustomerAddress);

// update default custmoer address
/**
 * @swagger
 * /customer/default/{addressId}:
 *  put:
 *    summary :  update default custmoer address  (customer must be login)
 *    tags: [customer-address-controller]
 *    parameters:
 *      - in: path
 *        name: addressId
 *        schema:
 *          type: string  
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *               $ref: '#/components/schemas/CustomerAddress'
 * 
 *    responses :
 *      '200' : 
 *          description : Successfully updated user details
 * 
 */
customerAddressRoutes.put("/address/default/:addressId", isAuthenticated(Customer, tokenType), updateDefaultCustomerddress);

// get custmoer address
/**
 * @swagger
 * /customer/address/{addressId}:
 *  get:
 *    summary : Update user details by customerId  (customer must be login)
 *    tags: [customer-address-controller]
 *    parameters:
 *      - in: path
 *        name: addressId
 *        schema:
 *          type: string  
 *    responses :
 *      '200' : 
 *          description : Successfully updated user details
 * 
 */
customerAddressRoutes.get("/address/:addressId", isAuthenticated(Customer, tokenType), getCustomerAddress);

// get customer addresses list
/**
 * @swagger
 * /customer/{customerId}/address:
 *  get:
 *    summary: get customer addresses list (customer must be login)
 *    tags: [customer-address-controller]
 *    parameters:
 *      - in: path
 *        name: customerId
 *        schema:
 *          type: string  
 *    responses:
 *      '200': 
 *          description: A successfull response
 *      '401': 
 *          description : Unauthorized No token provided ! Please login
 * 
 */
customerAddressRoutes.get("/:customerId/address", isAuthenticated(Customer, tokenType), customerAddressList)

// add custmoer address
// customerAddressRoutes.put("/address/:customerAddressId", isAuthenticated(Customer, tokenType), changeStatus);


export default customerAddressRoutes
