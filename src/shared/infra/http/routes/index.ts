import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) =>
  res.json({ message: "Welcome to the Book Tracker API" })
);

export { routes };
