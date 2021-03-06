import { Router } from "express";

import { booksRoutes } from "./books.routes";
import { sessionRoutes } from "./session.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.get("/", (req, res) =>
  res.json({ message: "Welcome to the Book Tracker API" })
);

routes.use("/users", userRoutes);
routes.use("/books", booksRoutes);
routes.use("/session", sessionRoutes);

export { routes };
