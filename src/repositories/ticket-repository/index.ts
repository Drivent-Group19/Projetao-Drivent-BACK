import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";

type CreateParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTickeyById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    }
  });
}
async function findTickeWithTypeById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    }
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true, //inner join
    }
  });
}

async function createTicket(ticket: CreateParams): Promise<Ticket> {
  console.log(ticket);
  const promise= prisma.ticket.create({
    data: {
      ticketTypeId: ticket.ticketTypeId,
      enrollmentId: ticket.enrollmentId,
      status: ticket.status
    }
  });
  console.log(promise);
  return promise;
}

async function ticketProcessPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    }
  });
}

async function getInfoByEmail(ticketId: number) {
  return await prisma.ticket.findUnique({
    where: { id: ticketId },
    select: {
      TicketType: true,
      Enrollment: {
        select: {
          name: true,
          User: true
        }
      }
    }
  });
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">

const ticketRepository = {
  findTicketTypes,
  findTicketByEnrollmentId,
  createTicket,
  findTickeyById,
  findTickeWithTypeById,
  ticketProcessPayment,
  getInfoByEmail
};

export default ticketRepository;
