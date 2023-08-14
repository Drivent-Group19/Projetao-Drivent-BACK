import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { ActivitiesBody } from "@/protocols";

export async function getActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const activities = await activitiesService.getActivities(Number(userId));

    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}

export async function postActivity(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const activities = await activitiesService.postActivity();

    return res.status(httpStatus.CREATED).send(activities);
  } catch (error) {
    next(error);
  }
}

export async function postPlace(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const place = await activitiesService.postPlace();

    return res.status(httpStatus.CREATED).send(place);
  } catch (error) {
    next(error);
  }
}

export async function postBookings(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { activityId } = req.body as ActivitiesBody;

  try {
    console.log(userId);
    console.log(activityId);
    const bookings = await activitiesService.postBookings(activityId, Number(userId));

    return res.status(httpStatus.CREATED).send(bookings);
  } catch (error) {
    next(error);
  }
}
