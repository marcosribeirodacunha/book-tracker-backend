import { Router } from "express";

import { CreateBookController } from "@modules/books/useCase/createBook/CreateBookController";
import { ListBooksController } from "@modules/books/useCase/listBooks/ListBooksController";
import { UpdateBookController } from "@modules/books/useCase/updateBook/UpdateBookController";
import { UpdateBookStatusController } from "@modules/books/useCase/updateBookStatus/UpdateBookStatusController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const router = Router();

const createBookController = new CreateBookController();
const listBooksController = new ListBooksController();
const updateBookController = new UpdateBookController();
const updateBookStatusController = new UpdateBookStatusController();

router.use(ensureAuthenticated);
router.get("/", listBooksController.handle);
router.post("/", createBookController.handle);
router.patch("/:id", updateBookController.handle);
router.patch("/:id/status", updateBookStatusController.handle);

export { router as booksRoutes };
