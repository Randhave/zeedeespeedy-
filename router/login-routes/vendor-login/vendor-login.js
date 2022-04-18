import express from 'express'
import { vendorLogin, vendorLogout, changePassword, changeEmail } from '../../../controller/login-controller/vendor-login-controller/vendor-login-controller.js';
import Vendor from '../../../model/vendor/vendor.js';

import { isAuthenticated } from '../../../middleware/auth.js'
const vendorLoginRoutes = express.Router();

const tokenType = "vendorAccessToken"

// login vendor
vendorLoginRoutes.post("/login", vendorLogin)

// logout from account
vendorLoginRoutes.post("/logout", isAuthenticated(Vendor, tokenType), vendorLogout)

// change password / update password
vendorLoginRoutes.put("/change/password", isAuthenticated(Vendor, tokenType), changePassword)

// change email 
vendorLoginRoutes.put("/email", isAuthenticated(Vendor, tokenType), changeEmail)


export default  vendorLoginRoutes