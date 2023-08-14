import { notFoundError } from "@/errors";
import eventRepository from "@/repositories/event-repository";
import { exclude } from "@/utils/prisma-utils";
import { Event } from "@prisma/client";
import dayjs from "dayjs";
// eslint-disable-next-line boundaries/element-types
import redis from "config/redis";
// eslint-disable-next-line boundaries/element-types
import { DEFAULT_EXP } from "config/redis";

async function getFirstEvent(): Promise<GetFirstEventResult> {
  const evento = await redis.get("events");

  if (!evento) {
    const event = await eventRepository.findFirst();
    if (!event) throw notFoundError();
    await redis.setEx("events", DEFAULT_EXP, JSON.stringify(event));
    return exclude(event, "createdAt", "updatedAt");
  } else {
    return JSON.parse(evento);
  }
}

export type GetFirstEventResult = Omit<Event, "createdAt" | "updatedAt">;

async function isCurrentEventActive(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

const eventsService = {
  getFirstEvent,
  isCurrentEventActive,
};

export default eventsService;
