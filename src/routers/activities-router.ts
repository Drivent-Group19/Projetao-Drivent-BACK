import { getActivities, postActivity, postBookings, postPlace } from "@/controllers/activities-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { activitiesSchema, bookingSchema } from "@/schemas/activities-schemas";
import { Router } from "express";

const activitiesRouter = Router();

activitiesRouter
  .get("/", authenticateToken, getActivities)
  .post("/", authenticateToken, validateBody(activitiesSchema), postActivity)
  .post("/place", authenticateToken, validateBody(activitiesSchema), postPlace)
  .post("/booking", authenticateToken, validateBody(bookingSchema), postBookings);

export { activitiesRouter };
