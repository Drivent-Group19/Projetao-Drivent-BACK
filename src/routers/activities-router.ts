import { getActivities, postActivity, postBookings, postPlace } from '@/controllers/activities-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const activitiesRouter = Router();

activitiesRouter
    .all('/', authenticateToken)
    .get('/', getActivities)
    .post('/', postActivity)
    .post('/place', postPlace)
    .post('/booking', postBookings);

export { activitiesRouter };