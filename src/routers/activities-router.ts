import { getActivities, postActivity, postBookings, postPlace } from '@/controllers/activities-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { activitiesSchema, bookingSchema } from '@/schemas/activities-schemas';
import { Router } from 'express';

const activitiesRouter = Router();

activitiesRouter
    .all('/', authenticateToken)
    .get('/', getActivities)
    .post('/', validateBody(activitiesSchema), postActivity)
    .post('/place', validateBody(activitiesSchema), postPlace)
    .post('/booking', validateBody(bookingSchema), postBookings);

export { activitiesRouter };