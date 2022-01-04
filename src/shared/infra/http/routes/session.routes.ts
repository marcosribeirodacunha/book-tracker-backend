import { Router } from "express";

import { AuthenticateUserController } from "@modules/account/useCases/authenticateUser/AuthenticateUserController";

const router = Router();

const authenticateUserController = new AuthenticateUserController();

router.post("/", authenticateUserController.handle);

export { router as sessionRoutes };
