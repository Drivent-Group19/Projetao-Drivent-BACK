import Joi from 'joi';

export const activitiesSchema = Joi.object({
  title: Joi.string().required(),
  capacity: Joi.number().min(1).required(),
  activityPlaceId: Joi.number().min(1).required(),
  eventId: Joi.number().min(1).required(),
  startsAt: Joi.date().required(),
  endsAt: Joi.date().required(),
});

export const bookingSchema = Joi.object({
  activityId: Joi.number().min(1).required(),
});
