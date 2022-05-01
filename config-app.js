
import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors'
import bodyParser from "body-parser";

import swaggerUi from 'swagger-ui-express'
import swaggerJsondoc from 'swagger-jsdoc';

// for image uploading
import cloudinary from 'cloudinary'
import fileUpload from 'express-fileupload'


// routes
import userRoutes from "./router/users-routes/users-routes.js";
import userLoginRoutes from "./router/login-routes/user-login/login-routes.js";
import brandRoutes from "./router/brand-routes/brand-routes.js";
import customerRoutes from './router/customer-routes/customer-routes.js';
import customerLoginRoutes from './router/login-routes/customer-login/customer-login.js';
import customerAddressRoutes from './router/customer-address-routes/customer-address-routes.js';
import buisnessCategoryRoutes from './router/buisness-category/buisness-category-routes.js';
import vendorRoutes from './router/vendor-routes/vendor-routes.js';
import walletRoutes from './router/wallet-routes/wallet-routes.js';
import categoryRoutes from './router/category-routes/category-routes.js';
import subCategoryRoutes from './router/sub-category-routes/sub-category-routes.js';
import vendorLoginRoutes from './router/login-routes/vendor-login/vendor-login.js';
import productRoutes from './router/product-routes/product-routes.js';
import cuisineRoutes from './router/cuisine-routes/cuisine-routes.js';

import swaggerRoutes from './swagger-config.js'
const configApp = express()



configApp.use(fileUpload({
    useTempFiles: true
}))

// configApp.use(cors());
configApp.use(
    cors({
        credentials: true,
        origin: "https://zeedeespeed.herokuapp.com/",
    })
);
configApp.use(cookieParser())
configApp.use(express.json())
configApp.use(bodyParser.json({ extends: true }))
configApp.use(bodyParser.urlencoded({ extended: true }));

configApp.get("/", (req, res) => {
    res.send(`<h1>Hello World</h1>`);
    res.end();
})
configApp.get("/home", (req, res) => {
    res.send(`<h1>Weolcome to Home page</h1>`);
    res.end();
})
configApp.get("/author", (req, res) => {
    res.send(`<h1>Aniket Randhave</h1>`);
    res.end();
})
// router
configApp.use("/users", userRoutes)
configApp.use("/user/login", userLoginRoutes)

//brand routes
configApp.use("/brand", brandRoutes)
 
// customer routes
configApp.use("/customer", customerRoutes)
configApp.use("/customer", customerAddressRoutes)
configApp.use("/user/login/customer", customerLoginRoutes)

// category routes
configApp.use("/business/category", buisnessCategoryRoutes)
configApp.use("/category", categoryRoutes)
configApp.use("/subcategory", subCategoryRoutes)

//vendor
configApp.use("/vendor", vendorRoutes)
configApp.use("/user/vendor", vendorLoginRoutes)
 
// wallet
configApp.use("/wallet", walletRoutes)

configApp.use("/product", productRoutes)
configApp.use("/cuisine", cuisineRoutes)


// swagger
configApp.use("/", swaggerRoutes)


// setup of cloudinary for images
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY
})

export default configApp