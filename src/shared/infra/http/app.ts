import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express, { Response } from "express";
import helmet from "helmet";
import { createConnection } from "typeorm";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";

import { routes } from "./routes";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();
    this.errors();
  }

  private database(): void {
    createConnection().then(() => {
      if (process.env.NODE_ENV !== "test")
        console.log("Database connected successfully");
    });
  }

  private middlewares(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(express.json());
  }

  private routes() {
    this.express.use(routes);
  }

  private errors(): void {
    this.express.use((error, req, res: Response, next) => {
      if (error instanceof AppError)
        return res.status(error.statusCode).json({ message: error.message });

      return res
        .status(500)
        .json({ message: `Internal Server Error - ${error.message}` });
    });
  }
}

const app = new App().express;
export { app };
