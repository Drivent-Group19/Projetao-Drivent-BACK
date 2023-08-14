import { Router } from "express";
import { getFirst } from "../controllers/first-controller";
import { validateTokenMiddleware } from "../middlewares/token-middleware";

const firstRouter = Router();

firstRouter.get("/", validateTokenMiddleware, getFirst);

export { firstRouter };