import express from "express";
import { addUser, allUsers, getUser, updateUser, deleteUser, changeUserStatus, assignRole } from "../../controller/users-controller/users-controller.js";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import User from "../../model/users/users.js";
const userRoutes = express.Router();

const tokenType = "userAccessToken"

/**s
* @swagger
*   components:
*     schemas:
*       User:
*         type: object
*         required:
*           - firstName
*           - lastName
*           - email
*           - password
*           - phoneNumber
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
*           Role:
*             type: string
*             description: default role of user is NORMAL
*           active:
*             type: string
*             description: default status of user is true
*/
 
/**
 * @swagger
 * tags:
 *  name: user-controller
 */


// add new user
/**
 * @swagger
 * /users/addUser:
 *  post:
 *    summary : Add new user (only access for super user admin)
 *    tags: [user-controller]
 *    parameters:
 *      - in: headers
 *        name: Authorization
 *        schema:
 *          type: string
 *   
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *    responses:
 *      '200':
 *        description: Successful fetched
 *      '400': 
 *          description : cannot add new user 
 */
userRoutes.post("/addUser", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), addUser)

// get all user list
/**
 * @swagger
 * /users/allUsers:
 *  get:
 *    summary: return all users
 *    tags: [user-controller]
 *    responses:
 *      '200': 
 *          description: A successfull response
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *      '401': 
 *          description : Unauthorized No token provided ! Please login
 * 
 */
userRoutes.get("/allUsers", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), allUsers)

// get user Info
/**
 * @swagger
 * /users/{userId}:
 *  get:
 *    summary : Get user by userId
 *    tags: [user-controller]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string     
 *    responses:
 *       '200':
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/User'
 */
userRoutes.get("/:userId", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), getUser)
 
// update user Info
/**
 * @swagger
 * /users/{userId}:
 *  put:
 *    summary : Update user details by userId 
 *    tags: [user-controller]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string  
 *    requestBody:
 *        content:
 *          application/json:
 *              schema:
 *               $ref: '#/components/schemas/User'
 * 
 *    responses :
 *      '200' : 
 *          description : Successfully updated user details
 * 
 */
userRoutes.put("/:userId", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), updateUser)

// delete user Info
/**
 * @swagger
 * /users/{userId}:
 *  delete:
 *    summary : Delete user by userId (only access for super user admin)
 *    tags: [user-controller]
 *    responses :
 *      '200' : 
 *          description : Successfully deleted user
 * 
 */
userRoutes.delete("/:userId", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), deleteUser)

// change user status
/**
 * @swagger
 * /users/status/{userId}:
 *  put:
 *    summary : Change user status by userId (only access for super user admin)
 *    tags: [user-controller]
 *    parameters:
 *      - in: path
 *        name: userId
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
userRoutes.put("/status/:userId", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), changeUserStatus)

// assign roles
/**
 * @swagger
 * /users/assignRole/{userId}:
 *  put:
 *    summary : Assign role by userId (only access for super user admin)
 *    tags: [user-controller]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string  
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    newRole:
 *                       type: string
 *                       enum: [NORMAL, SUPER_ADMIN]
 * 
 *    responses :
 *      '200' : 
 *          description : Successfully Assigned user role
 *      '400' : 
 *          description : You are not super admin | cannot assign role
 * 
 */
userRoutes.put("/assignRole/:userId", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), assignRole)

export default userRoutes