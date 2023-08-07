import { conflictError, notFoundError } from '@/errors';
import { cannotListActivitiesError } from '@/errors/cannot-list-activities-error';
import activitiesRepository from '@/repositories/activities-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';
import { Activity, ActivityBooKing } from '@prisma/client';

async function getActivities(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListActivitiesError();
  }

  const activity = await activitiesRepository.findActivities();

  if (!activity || activity.length === 0) throw notFoundError();

  return activity;
}

async function postBookings(activityId: number, userId: number) {
    const activities: Activity = await activitiesRepository.findActivitiesById(activityId);

    if(!activities) throw notFoundError();

    const activitiesTime: ActivityBooKing[] = await activitiesRepository.findAllActivitiesBookings(userId);

    for (let i = 0; i < activitiesTime.length; i++) {
        const activity: Activity = await activitiesRepository.findActivitiesById(activitiesTime[i].activityId);

        if(activity.startsAt.setSeconds(0,0) === activities.startsAt.setSeconds(0,0)){
            throw conflictError('user cannot participate in two events at the same time')
        }
    }

    const bookings: ActivityBooKing = await activitiesRepository.createActivities(activityId, userId);

    return bookings;
}

async function postActivity() {
    return 0;
}

async function postPlace() {
    return 0;
}

const activitiesService = {
  getActivities,
  postActivity,
  postPlace,
  postBookings,
};

export default activitiesService;
