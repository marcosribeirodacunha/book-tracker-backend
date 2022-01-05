import { Router } from "express";

import { CreateBookController } from "@modules/books/useCase/createBook/CreateBookController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const router = Router();

const createBookController = new CreateBookController();

router.use(ensureAuthenticated);
router.post("/", createBookController.handle);

export { router as booksRoutes };
