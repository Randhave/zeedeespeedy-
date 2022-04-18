import express from "express";
import { addUser, allUsers, getUser, updateUser, deleteUser, changeUserStatus, assignRole } from "../../controller/users-controller/users-controller.js";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import User from "../../model/users/users.js";
const userRoutes = express.Router();

const tokenType = "userAccessToken"
// add new user 
userRoutes.post("/addUser", addUser)

// get all user list
userRoutes.get("/allUsers", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), allUsers)

// get user Info
userRoutes.get("/:userId", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), getUser)

// update user Info
userRoutes.put("/:userId", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), updateUser)

// delete user Info
userRoutes.delete("/:userId", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), deleteUser)

// change user status
userRoutes.put("/status/:userId", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), changeUserStatus)

// assign roles
userRoutes.put("/assignRole/:userId", isAuthenticated(User, tokenType), authorizeRoles("SUPER_ADMIN"), assignRole)

export default userRoutes