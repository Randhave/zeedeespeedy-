import express from 'express'
import { allCustomer, changeCustomerStatus, getCustomerWalletBalance, deleteCustomer, getCustomerInfo, newCustomer, updateCustomerInfo } from '../../controller/customer-controller/customer-controller.js';
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import Customer from '../../model/customer/customer.js';


const customerRoutes = express.Router();

const tokenType = "customerAccessToken"

// add new customer
customerRoutes.post("/", newCustomer)

// get all customers
customerRoutes.get("/all", allCustomer)

// get customer info by customerId
customerRoutes.get("/:customerId",  isAuthenticated(Customer, tokenType), getCustomerInfo);

// update customer info by customerId
customerRoutes.put("/:customerId",  isAuthenticated(Customer, tokenType), updateCustomerInfo)

// change customer status by customerId
customerRoutes.put("/status/:customerId",  isAuthenticated(Customer, tokenType), changeCustomerStatus)

// delete the customer by cusotmrId
customerRoutes.delete("/:customerId",  isAuthenticated(Customer, tokenType), deleteCustomer)

// get customer wallets
customerRoutes.get("/wallet/:customerId", isAuthenticated(Customer, tokenType), getCustomerWalletBalance)

export default customerRoutes