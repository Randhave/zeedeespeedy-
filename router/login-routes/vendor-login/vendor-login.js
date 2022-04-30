import express from 'express'
import { vendorLogin, vendorLogout, changePassword, changeEmail } from '../../../controller/login-controller/vendor-login-controller/vendor-login-controller.js';
import Vendor from '../../../model/vendor/vendor.js';

import { isAuthenticated } from '../../../middleware/auth.js'
const vendorLoginRoutes = express.Router();

const tokenType = "vendorAccessToken"

/**
 * @swagger 
 * tags:
 *  name: vendor-controller
 */


// login vendor
/**
 * @swagger
 * /user/vendor/login:
 *  post:
 *    summary : login vendor
 *    tags: [user-login-controller]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User-login'
 *    responses:
 *      '200': 
 *          description : Successfully logged in
 *      '400': 
 *          description : Invalid credentials 
 */
vendorLoginRoutes.post("/login", vendorLogin)

// logout from account
/**
 * @swagger
 * /user/vendor/logout:
 *  post:
 *    summary : vendorLogout (before hit this url user should be login)
 *    tags: [user-login-controller]
 *    responses:
 *      '200': 
 *          description : user successfully logged out
 *      '400': 
 *          description : Invalid credentials 
 */
vendorLoginRoutes.post("/logout", isAuthenticated(Vendor, tokenType), vendorLogout)

// change password / update password
/**
 * @swagger
 * /user/vendor/change/password:
 *  put:
 *    summary : changePassword for vendor(before hit this url user should be )login
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
vendorLoginRoutes.put("/change/password", isAuthenticated(Vendor, tokenType), changePassword)

// change email
/**
 * @swagger
 * /user/vendor/change/email:
 *  put:
 *    summary : changeEmail (before hit this url user should be login)
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
vendorLoginRoutes.put("/change/email", isAuthenticated(Vendor, tokenType), changeEmail)

 
export default  vendorLoginRoutes