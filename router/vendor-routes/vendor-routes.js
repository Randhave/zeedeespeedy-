import express from 'express'
import { addVendor, getAllVendorsList, updatePersonalDetails, getVendorBasicDetails, changeStatus }
    from '../../controller/vendor-controller/vendor-controller.js';
import { isAuthenticated } from '../../middleware/auth.js';
import Vendor from '../../model/vendor/vendor.js';

const vendorRoutes = express.Router();

const tokenType = "vendorAccessToken"

// add vendor
vendorRoutes.post("/", addVendor);

// get all vendor list
vendorRoutes.get("/", getAllVendorsList)

// update vendor details
vendorRoutes.put("/:vendorId", isAuthenticated(Vendor, tokenType), updatePersonalDetails)

// get vondor app details
// vendorRoutes.get("/app/detail/:vendorId", getVendorCustomerDetails)

// update vendor bank details
// vendorRoutes.put("/bank/details/", updateVendorBankDetails);

// get venodr bank details 
// vendorRoutes.get("/bank/details/:vendorId", getVendorBankDetails);

// get vendor basic details
vendorRoutes.get("/basic/:vendorId", isAuthenticated(Vendor, tokenType), getVendorBasicDetails);

// change vendor status
// vendorRoutes.put("/change/status/:vendorId/:newStatus", changeVendorStatus)

// export vendor list
// vendorRoutes.post("/export/list", exportList)

// change stastus of its feauture product
// vendorRoutes.put("/featured/:vendorId", changeStatusofFeatureProduct)

// delete vendor image
vendorRoutes.delete("/image/:vendorId")

// update restaurant details
// vendorRoutes.put("/restaurant/details", updateRestaurantDetails);

// change vendor status
vendorRoutes.put("/change/status/:vendorId/:newStatus", isAuthenticated(Vendor, tokenType), changeStatus)

// get venodr
vendorRoutes.get("/:vendorId", isAuthenticated(Vendor, tokenType), getVendorBasicDetails)

export default vendorRoutes