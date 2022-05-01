import express from 'express'
import { varifyCustomerByOTP, varifyCustomerByURL } from '../../../controller/login-controller/customer-login-controller/customer-login-controller.js'
import { adminLogin, adminlogout, userLoginInfo, changeEmail, changePassword, forgotPassword, resetPassword }
    from '../../../controller/login-controller/user-login-controller/user-login-controller.js'
import { isAuthenticated } from '../../../middleware/auth.js'
import User from '../../../model/users/users.js'

const userLoginRoutes = express.Router()

const tokenType = "userAccessToken"


/**
*  @swagger
*  components:
*    tags: [user-login-controller]
*    schemas:
*      User-login:
*        type: object
*        properties:
*          email:
*            type: string
*          password:
*            type: string
*        required:
*          - email
*          - password
 */

// login in account
/**
 * @swagger
 * /user/login/admin/login:
 *  post:
 *    summary : adminLogin (normal user also login here)
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
userLoginRoutes.post("/admin/login", adminLogin)

// logout from account
/**
 * @swagger
 * /user/login/logout:
 *  post:
 *    summary : adminlogout (before hit this url user should be login)
 *    tags: [user-login-controller]
 *    responses:
 *      '200': 
 *          description : user successfully logged out
 *      '400': 
 *          description : Invalid credentials 
 */
userLoginRoutes.post("/logout", isAuthenticated(User, tokenType), adminlogout)

// login user info
/**
 * @swagger
 * /user/login/basic:
 *  get:
 *    summary : userLoginInfo (before hit this url user should be login)
 *    tags: [user-login-controller]
 *       
 *    responses:
 *       '200':
 *         description: successfully fetched data
 */
userLoginRoutes.get("/basic", isAuthenticated(User, tokenType), userLoginInfo)

// change password / update password
/**
 * @swagger
 * /user/login/change/password:
 *  put:
 *    summary : changePassword (before hit this url user should be login)
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
userLoginRoutes.put("/change/password", isAuthenticated(User, tokenType), changePassword)

// change email
/**
 * @swagger
 * /user/login/email:
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
userLoginRoutes.put("/email", isAuthenticated(User, tokenType), changeEmail)

// forgot password --> sending an url on given email address
/**
 * @swagger
 * /user/login/forgotPassword:
 *  post:
 *    summary : forgotPassword (send an url on registered email for reseting password)
 *    tags: [user-login-controller]
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    email:
 *                       type: string
 *                     
 *    responses:
 *       '200':
 *         description: successfully send an email to use
 *       '400':
 *         description: cannot send email
 *       '500':
 *         description: Internal server error
 */
userLoginRoutes.post("/forgotPassword", forgotPassword)

// reseting password/creating new password --> with the help of url who send by forgot password
/**
 * @swagger
 * /user/login/resetpassword/{token}:
 *  put:
 *    summary : forgotPassword (send an url on registered email for reseting password)
 *    tags: [user-login-controller]
 *    parameters:
 *      - in: path
 *        name: token
 *        schema:
 *          type: string  
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    password:
 *                       type: string
 *                    confirmPassword:
 *                       type: string
 *             
 *    responses:
 *       '200':
 *         description: successfully send an email to use
 *       '400':
 *         description: cannot send email
 *       '500':
 *         description: Internal server error
 */
userLoginRoutes.put("/resetpassword/:token", resetPassword)

// varify user by email
/**
 * @swagger
 * /user/login/varify/email/url/{token}:
 *  get:
 *    summary: varifyCustomerByURL (varify user by email)
 *    tags: [user-login-controller]
 *    parameters:
 *      - in: path
 *        name: token
 *        schema:
 *          type: string             
 *    responses:
 *       '200':
 *         description:  successfully send an url on email for varify customer/user
 *       '400':
 *         description: cannot varify user
 *       '500':
 *         description: Internal server error
 */
userLoginRoutes.get("/varify/email/url/:token", varifyCustomerByURL)

// varify user by otp
/**
 * @swagger
 * /user/login/varify/email/otp:
 *  put:
 *    summary: varifyCustomerByOTP (varify user by otp)
 *    tags: [user-login-controller]
 *    parameters:
 *      - in: path
 *        name: token
 *        schema:
 *          type: string
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    otp:
 *                       type: integer
 *              
 *    responses:
 *       '200':
 *         description: successfully send an otp on email for varify customer/user
 *       '400':
 *         description: cannot send an otp
 *       '500':
 *         description: Internal server error
 */
userLoginRoutes.put("/varify/email/otp", varifyCustomerByOTP)


export default userLoginRoutes