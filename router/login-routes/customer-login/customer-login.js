import express from 'express'
import { changeEmail, changePassword, customerLogin, customerLoginInfo, customerLogut }
    from '../../../controller/login-controller/customer-login-controller/customer-login-controller.js'

import { isAuthenticated } from '../../../middleware/auth.js'
import Customer from '../../../model/customer/customer.js'

const customerLoginRoutes = express.Router()

const tokenType = "customerAccessToken"


/**
 * @swagger
 * tags:
 *  name: user-login-controller
 */


// login in account
/**
 * @swagger
 * /user/login/customer/login:
 *  post:
 *    summary : customerLogin
 *    tags: [user-login-controller]
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    email:
 *                       type: string
 *                    password:
 *                       type: string
 *             
 *    responses:
 *       '200':
 *         description: Successfully logged in
 *       '400':
 *         description: Invalid credentials
 *       '500':
 *         description: Internal server error
 */
customerLoginRoutes.post("/login", customerLogin) 

// logout from account
/**
 * @swagger
 * /user/login/customer/logout:
 *  post:
 *    summary : customerLogut 
 *    tags: [user-login-controller]
 *    responses:
 *      '200': 
 *          description : customer successfully logged out
 *      '400': 
 *          description : Invalid credentials 
 */
customerLoginRoutes.post("/logout", isAuthenticated(Customer, tokenType), customerLogut)

// login user info
/**
 * @swagger
 * /user/login/customer/basic:
 *  get:
 *    summary : customerLoginInfo 
 *    tags: [user-login-controller]
 *       
 *    responses:
 *       '200':
 *         description: successfully fetched data
 */
customerLoginRoutes.get("/basic", isAuthenticated(Customer, tokenType), customerLoginInfo)

// change password / update password
/**
 * @swagger
 * /user/login/customer/change/password:
 *  put:
 *    summary : changePassword (before change password customer should be login)
 *    tags: [user-login-controller]
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    currentPassword:
 *                       type: string
 *                    newPassword:
 *                       type: string
 *                    confirmNewPassword:
 *                       type: string      
 *    responses:
 *       '200':
 *         description: successfully changed password
 *       '400':
 *         description: cannot change password
 *       '500':
 *         description: Internal server error
 */
customerLoginRoutes.put("/change/password", isAuthenticated(Customer, tokenType), changePassword)

// change email
/**
 * @swagger
 * /user/login/customer/email:
 *  put:
 *    summary : changeEmail
 *    tags: [user-login-controller]
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    password:
 *                       type: string
 *                    newEmail:
 *                       type: string
 *                    confirmNewEmail:
 *                       type: string
 *                    
 * 
 *    responses:
 *       '200':
 *         description: successfully changed email
 *       '400':
 *         description: cannot change email
 *       '500':
 *         description: Internal server error
 */
customerLoginRoutes.put("/email", isAuthenticated(Customer, tokenType), changeEmail)
 
export default customerLoginRoutes