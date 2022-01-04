import { Router } from "express";

import { CreateUserController } from "@modules/account/useCases/createUser/CreateUserController";
import { ShowUserController } from "@modules/account/useCases/showUser/ShowUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const showUserController = new ShowUserController();

router.post("/", createUserController.handle);
router.get("/me", ensureAuthenticated, showUserController.handle);

export { router as userRoutes };
