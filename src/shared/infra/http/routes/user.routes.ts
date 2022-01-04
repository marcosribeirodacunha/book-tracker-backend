import { Router } from "express";

import { CreateUserController } from "@modules/account/useCases/createUser/CreateUserController";

const router = Router();

const createUserController = new CreateUserController();

router.post("/", createUserController.handle);

export { router as userRoutes };
