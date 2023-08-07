import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

export async function getActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const activities = await activitiesService.getActivities(userId);
    
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}

export async function postActivity(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

export async function postPlace(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

export async function postBookings(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}
