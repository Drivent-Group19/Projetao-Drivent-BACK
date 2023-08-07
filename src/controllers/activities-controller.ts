import { AuthenticatedRequest } from '@/middlewares';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

export async function getActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    // const activities = await 
    // return res.status(httpStatus.OK)
  } catch (error) {
    next(error);
  }
}
