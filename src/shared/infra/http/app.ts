import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { createConnection } from "typeorm";

import { routes } from "./routes";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  private database() {
    createConnection().then(() =>
      console.log("Database connected successfully")
    );
  }

  private middlewares() {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(express.json());
  }

  private routes() {
    this.express.use(routes);
  }
}

const app = new App().express;
export { app };
