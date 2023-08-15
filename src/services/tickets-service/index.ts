import { notFoundError, conflictError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.findTicketTypes();

  if (!ticketTypes) {
    throw notFoundError();
  }
  return ticketTypes;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  console.log(enrollment);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  console.log(ticket);
  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  console.log(enrollment);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  console.log(ticket);

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED
  };
  
  if(ticket === null) {
    console.log("oi");
    await ticketRepository.createTicket(ticketData);
    const newTicket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
    console.log(newTicket);
    return newTicket;
  } else {
    throw conflictError("O usuário já possui um ingresso");
  }
}

const ticketService = {
  getTicketTypes,
  getTicketByUserId,
  createTicket
};

export default ticketService;
