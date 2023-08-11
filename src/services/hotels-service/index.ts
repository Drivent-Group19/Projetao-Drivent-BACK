import hotelRepository from "@/repositories/hotel-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
// eslint-disable-next-line boundaries/element-types
import redis from "config/redis";
// eslint-disable-next-line boundaries/element-types
import { DEFAULT_EXP } from "config/redis";

async function listHotels(userId: number) {
  //Tem enrollment?
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListHotelsError();
  }
}

async function getHotels(userId: number) {
  await listHotels(userId);

  if (userId) {
    const cacheKey = "hotels";
    const cachedPhotos = await redis.get(cacheKey);
    if (cachedPhotos) return JSON.parse(cachedPhotos);
    else {
      const hotels = await hotelRepository.findHotels();
      redis.setEx(cacheKey, DEFAULT_EXP, JSON.stringify(hotels));
      return hotels;
    }
  }
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await listHotels(userId);
  const hotel = await hotelRepository.findRoomsByHotelId(hotelId);

  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

const hotelService = {
  getHotels,
  getHotelsWithRooms,
};

export default hotelService;
