import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { router } from './routes';
import swaggerFile from "@root/src/swagger.json";
import { AppError } from "@shared/errors/AppError";
import { AppDataSource } from "@shared/infra/typeorm/database/index";
import "@shared/container";

// import swaggerAutogen from "swagger-autogen"

const app = express();
app.use(express.json());
app.use(router);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});
// const endpointsFiles = ["./src/routes/categories.routes.ts"]
// swaggerAutogen("./swagger-auto.json", endpointsFiles);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

export { app }