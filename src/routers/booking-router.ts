import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, listBooking, changeBooking, getBookingByRoomId } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .get("/", authenticateToken, listBooking)
  .post("/", authenticateToken, bookingRoom)
  .get("/:roomId",  getBookingByRoomId)
  .put("/:bookingId", authenticateToken, changeBooking);

export { bookingRouter };
