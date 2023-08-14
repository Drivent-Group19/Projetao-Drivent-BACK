import { Router } from "express";
import { login } from "../controllers/auth-controller";

const authGitRouter = Router();

authGitRouter.post("/login", login);

export { authGitRouter };

