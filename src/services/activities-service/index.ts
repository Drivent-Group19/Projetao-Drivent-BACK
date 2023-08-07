import { notFoundError } from '@/errors';
import { cannotListActivitiesError } from '@/errors/cannot-list-activities-error';
import activitiesRepository from '@/repositories/activities-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getActivities(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListActivitiesError();
  }

  const activity = await activitiesRepository.findActivities();

  if (!activity || activity.length === 0) {
    throw notFoundError();
  }

  return activity;
}

const activitiesService = {
  getActivities,
};

export default activitiesService;
