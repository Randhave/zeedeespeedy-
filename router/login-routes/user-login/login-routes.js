import express from 'express'
import { varifyCustomerByOTP, varifyCustomerByURL } from '../../../controller/login-controller/customer-login-controller/customer-login-controller.js'
import { adminLogin, adminlogout, userLoginInfo, changeEmail, changePassword, forgotPassword, resetPassword }
    from '../../../controller/login-controller/user-login-controller/user-login-controller.js'
import { isAuthenticated } from '../../../middleware/auth.js'
import User from '../../../model/users/users.js'

const userLoginRoutes = express.Router()

const tokenType = "userAccessToken"

// login in account
userLoginRoutes.post("/admin/login", adminLogin)

// logout from account
userLoginRoutes.post("/logout", isAuthenticated(User, tokenType), adminlogout)

// login user info
userLoginRoutes.get("/basic", isAuthenticated(User, tokenType), userLoginInfo)

// change password / update password
userLoginRoutes.put("/change/password", isAuthenticated(User, tokenType), changePassword)

// change email 
userLoginRoutes.put("/email", isAuthenticated(User, tokenType), changeEmail)

// forgot password --> sending an url on given email address
userLoginRoutes.post("/forgotPassword", forgotPassword)

// reseting password/creating new password --> with the help of url who send by forgot password
userLoginRoutes.put("/resetpassword/:token", resetPassword)

// varify user by email 
userLoginRoutes.put("/varify/email/url:token", varifyCustomerByURL)

// varify user by otp 
userLoginRoutes.put("/varify/email/otp", varifyCustomerByOTP)


export default userLoginRoutes