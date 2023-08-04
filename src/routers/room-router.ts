import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getRoomsByHotelId } from "@/controllers";

const roomRouter= Router();

roomRouter.get("/:hotelId", getRoomsByHotelId);

export { roomRouter };
