import express from 'express'
import { allCustomer, changeCustomerStatus, getCustomerWalletBalance, deleteCustomer, getCustomerInfo, newCustomer, updateCustomerInfo } from '../../controller/customer-controller/customer-controller.js';
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import Customer from '../../model/customer/customer.js';
import User from '../../model/users/users.js';


const customerRoutes = express.Router();

const tokenType = "customerAccessToken"


const usertokenType = "userAccessToken"



/**
* @swagger
*   components:
*     schemas:
*       Customer:
*         type: object
*         required:
*           - firstName
*           - lastName
*           - email
*           - password
*           - phoneNumber
*           - gender
*           - birthDate
*         properties:
*           firstName:
*             type: string
*           lastName:
*             type: string
*           email:
*             type: string
*           password:
*             type: string
*           phoneNumber:
*             type: integer
*           registeredVia:
*             type: string
*           gender:
*             type: string
*           birthDate:
*             type: string
*/


/**
 * @swagger
 * tags:
 *  name: customer-controller
 */

// add new customer
/**
 * @swagger
 * /customer/:
 *  post:
 *    summary : newCustomer 
 *    tags: [customer-controller]   
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Customer'
 *    responses:
 *      '200':
 *        description: Successful fetched
 *      '400': 
 *          description : cannot add new user 
 */
customerRoutes.post("/", newCustomer)

// get all customers
/**
 * @swagger
 * /customer/all:
 *  get:
 *    summary: allCustomer return all customer
 *    tags: [customer-controller]
 *    responses:
 *      '200': 
 *          description: A successfull response
 *      '401': 
 *          description : Unauthorized No token provided ! Please login
 * 
 */
customerRoutes.get("/all", isAuthenticated(User, usertokenType), authorizeRoles("SUPER_ADMIN"), allCustomer)

// get customer info by customerId
/**
 * @swagger
 * /customer/{customerId}:
 *  get:
 *    summary : Update user details by customerId 
 *    tags: [customer-controller]
 *    parameters:
 *      - in: path
 *        name: customerId
 *        schema:
 *          type: string  
 *    responses :
 *      '200' : 
 *          description : Successfully updated user details
 * 
 */
customerRoutes.get("/:customerId", isAuthenticated(Customer, tokenType), getCustomerInfo);

// update customer info by customerId
/**
 * @swagger
 * /customer/{customerId}:
 *  put:
 *    summary : update customer info by customerId 
 *    tags: [customer-controller]
 *    parameters:
 *      - in: path
 *        name: customerId
 *        schema:
 *          type: string  
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *               $ref: '#/components/schemas/Customer'
 * 
 *    responses :
 *      '200' : 
 *          description : Successfully updated user details
 * 
 */
customerRoutes.put("/:customerId", isAuthenticated(Customer, tokenType), updateCustomerInfo)

// change customer status by customerId
/**
 * @swagger
 * /customer/status/{customerId}:
 *  put:
 *    summary : change customer status by customerId (only access for super admin user)
 *    tags: [customer-controller]
 *    parameters:
 *      - in: path
 *        name: customerId
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
customerRoutes.put("/status/:customerId", isAuthenticated(User, usertokenType), authorizeRoles("SUPER_ADMIN"), changeCustomerStatus)

// delete the customer by cusotmrId
/**
 * @swagger
 * /users/{userId}:
 *  delete:
 *    summary : delete the customer by cusotmrId (only access for super user admin)
 *    tags: [customer-controller]
 *    responses :
 *      '200' : 
 *          description : Successfully deleted user
 * 
 */
customerRoutes.delete("/:customerId", isAuthenticated(User, usertokenType), authorizeRoles("SUPER_ADMIN"), deleteCustomer)

// get customer wallets
/**
 * @swagger
 * /customer/wallet/{customerId}:
 *  get:
 *    summary : get customer wallets details by customerId 
 *    tags: [customer-controller]
 *    parameters:
 *      - in: path
 *        name: customerId
 *        schema:
 *          type: string  
 *    responses :
 *      '200' : 
 *          description : Successfully updated user details
 * 
 */
customerRoutes.get("/wallet/:customerId", isAuthenticated(Customer, tokenType), getCustomerWalletBalance)

export default customerRoutes