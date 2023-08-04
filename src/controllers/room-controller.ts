import { Response, Request } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import roomService from "@/services/room-service";
import httpStatus from "http-status";

export async function getRoomsByHotelId(req: Request, res: Response) {
  const { hotelId } = req.params;
  
  try {
    const rooms = await roomService.getRoomsByHotelId( Number(hotelId));
  
    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "cannotListHotelsError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
