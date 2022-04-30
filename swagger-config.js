import swaggerUi from 'swagger-ui-express'
import swaggerJsondoc from 'swagger-jsdoc';
import express from 'express';
const swaggerRoutes = express.Router();



swaggerRoutes.get("/swagger", (req, res) => {
    res.json("Hello world! swagger");
});


const swaggerOptions = {
    definition: {
        // components: {},
        openapi: '3.0.0',
        docExpansion: 'none',
        info: {
            title: "Doosy Application",
            description:
                "Doosy Application API reference for developers",
        },
        servers: [
            // {
            //     url: "http://localhost:4000/",
            //     description: "For local server"
            // },
            {
                url: "https://zeedeespeed.herokuapp.com/",
                description: "For deployed server"
            }
        ]
    },
    // routes
    apis: ["./router/*/*.js", "./router/*/*/*.js"]

}

const swggerDocs = swaggerJsondoc(swaggerOptions);
swaggerRoutes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swggerDocs))



export default swaggerRoutes