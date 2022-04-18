import express from "express";
import dotenv from 'dotenv'


dotenv.config({})

// database connection
import Connection from "./db/connection1.js";
import configApp from "./config-app.js";

const app = express()
const port = 4000


// config-app
app.use(configApp)


// database connection
Connection()


app.listen(port, () => {
    console.log(`server successfully running on http://localhost:${port} port`)
})

