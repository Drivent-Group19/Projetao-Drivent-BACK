import { prisma } from '@/config';
import { Activity, ActivityBooKing } from '@prisma/client';

async function findActivities() {
  return prisma.activity.findMany({
    include: {
      ActivityPlace: true,
      ActivityBooking: true,
    },
  });
}

async function createActivities(activityId: number, userId: number): Promise<ActivityBooKing> {
  return prisma.activityBooKing.create({
    data: {
      activityId,
      userId,
    },
  });
}

async function findActivitiesById(activityId: number): Promise<Activity> {
  return prisma.activity.findFirst({
    where: {
      id: activityId,
    },
  });
}

async function findAllActivitiesBookings(userId: number): Promise<ActivityBooKing[]> {
  return prisma.activityBooKing.findMany({
    where: {
      userId: userId,
    },
  });
}

const activitiesRepository = {
  createActivities,
  findActivities,
  findActivitiesById,
  findAllActivitiesBookings,
};

export default activitiesRepository;