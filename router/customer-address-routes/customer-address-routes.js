import express from 'express'
import { addCustomersAddress, getCustomerAddress, addressList, updateCustomerAddress, customerAddressList, updateDefaultCustomerddress } from '../../controller/customer-address-controller/customer-address-controller.js';
import { isAuthenticated } from '../../middleware/auth.js';
import Customer from '../../model/customer/customer.js';

const customerAddressRoutes = express.Router();


const tokenType = "customerAccessToken"


// add custmoer address
customerAddressRoutes.post("/address", isAuthenticated(Customer, tokenType), addCustomersAddress);

// get all address list
customerAddressRoutes.get("/address", isAuthenticated(Customer, tokenType), addressList)

// update custmoer address
customerAddressRoutes.put("/address", isAuthenticated(Customer, tokenType), updateCustomerAddress);

// update default custmoer address
customerAddressRoutes.put("/address/default/:addressId", isAuthenticated(Customer, tokenType), updateDefaultCustomerddress);

// get custmoer address
customerAddressRoutes.get("/address/:addressId", isAuthenticated(Customer, tokenType), getCustomerAddress);

// get customer addresses list
customerAddressRoutes.get("/:customerId/address", isAuthenticated(Customer, tokenType), customerAddressList)

// add custmoer address
// customerAddressRoutes.put("/address/:customerAddressId", isAuthenticated(Customer, tokenType), changeStatus);


export default customerAddressRoutes
