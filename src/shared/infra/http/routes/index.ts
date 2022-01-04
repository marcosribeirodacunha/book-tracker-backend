import { Router } from "express";

import { userRoutes } from "./user.routes";

const routes = Router();

routes.get("/", (req, res) =>
  res.json({ message: "Welcome to the Book Tracker API" })
);

routes.use("/users", userRoutes);

export { routes };
