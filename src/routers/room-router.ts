import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getRoomsByHotelId, getRoomById } from "@/controllers";

const roomRouter= Router();

roomRouter.get("/:hotelId", getRoomsByHotelId);
roomRouter.get("/specific/:roomId", getRoomById);

export { roomRouter };
