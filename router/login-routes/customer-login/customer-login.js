import express from 'express'
import { changeEmail, changePassword, customerLogin, customerLoginInfo, customerLogut }
    from '../../../controller/login-controller/customer-login-controller/customer-login-controller.js'

import { isAuthenticated } from '../../../middleware/auth.js'
import Customer from '../../../model/customer/customer.js'

const customerLoginRoutes = express.Router()

const tokenType = "customerAccessToken"

// login in account
customerLoginRoutes.post("/login", customerLogin)

// logout from account
customerLoginRoutes.post("/logout", isAuthenticated(Customer, tokenType), customerLogut)

// login user info
customerLoginRoutes.get("/basic", isAuthenticated(Customer, tokenType), customerLoginInfo)

// change password / update password
customerLoginRoutes.put("/change/password", isAuthenticated(Customer, tokenType), changePassword)

// change email 
customerLoginRoutes.put("/email", isAuthenticated(Customer, tokenType), changeEmail)
 
export default customerLoginRoutes