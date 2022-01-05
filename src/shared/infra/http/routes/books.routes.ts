import { Router } from "express";

import { CreateBookController } from "@modules/books/useCase/createBook/CreateBookController";
import { UpdateBookStatusController } from "@modules/books/useCase/updateBookStatus/UpdateBookStatusController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const router = Router();

const createBookController = new CreateBookController();
const updateBookStatusController = new UpdateBookStatusController();

router.use(ensureAuthenticated);
router.post("/", createBookController.handle);
router.patch("/:id/status", updateBookStatusController.handle);

export { router as booksRoutes };
