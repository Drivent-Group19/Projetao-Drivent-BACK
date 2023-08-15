import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { generateCPF, getStates } from '@brazilian-utils/brazilian-utils';
import { options } from 'joi';

const prisma = new PrismaClient();

async function createEvent() {
  console.log('Creating event...');

  return prisma.event.create({
    data: {
      title: 'Driven.t',
      logoImageUrl:
        'https://uploads-ssl.webflow.com/62235d098ddf9185c2d74422/63501c4f05bcfe3a3ce9327a_logo_pink%20(1).png',
      backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
      startsAt: dayjs().toDate(),
      endsAt: dayjs().add(21, 'days').toDate(),
    },
  });
}


function getRandomIndex(length: number) {

  // get random index value
  const randomIndex = Math.floor(Math.random() * length);
  return randomIndex
}

function getRooms() {
  const array=[1,2,3]
  
  const roomNumberMapper = (n: number, index: number) => {
    return {
      name: (n + index).toString(),
      capacity: array[getRandomIndex(3)]
    };
  };

  const firstFloor = Array(10).fill(101).map(roomNumberMapper);
  const secondFloor = Array(10).fill(201).map(roomNumberMapper);

  return [...firstFloor, ...secondFloor];
}

async function createHotels() {
  console.log('Creating hotels...');

  const images = [
    'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
    'https://images.app.goo.gl/qz7PZ4TeYogqjG8N9',
    'https://images.app.goo.gl/5FkSEKEhtxES8L9M9',
    'https://images.app.goo.gl/V5Migg7pqNUuCvFD9',
    'https://images.app.goo.gl/vfwzSyoqewifJ2rRA'
  ];

  const hotels = images.map((image, index) => {
    return {
      image,
      name: `Hotel ${(index + 1).toString().padStart(2, '0')}`,
      Rooms: {
        create: getRooms(),
      },
    };
  });

  return Promise.all(hotels.map((data) => prisma.hotel.create({ data })));
}


async function createActivity() {
  let activity = await prisma.activity.findFirst();

  if(activity){
    await prisma.activity.deleteMany({});
    await prisma.activityPlace.deleteMany({});
  }

  const placeOne = await prisma.activityPlace.create({
    data: {
      name: 'Auditório Principal',
    },
  });

  const placeTwo = await prisma.activityPlace.create({
    data: {
      name: 'Auditório Lateral',
    },
  });

  const placeThree = await prisma.activityPlace.create({
    data: {
      name: 'Sala de Workshop',
    },
  })

  const hour = 9;
  let day = 7;
  
  //se der erro pode ser aqui
  const event = await createEvent();

  await prisma.activity.create({
    data:{
      title: 'Introdução ao React',
      capacity: 30,
      activityPlaceId: placeOne.id,
      eventId: event.id,
      startsAt: dayjs().add(day, 'day').hour(hour + 1).toDate(),
      endsAt: dayjs().add(day, 'day').hour(hour + 2).toDate(),
    }
  });

  await prisma.activity.create({
    data:{
      title: 'Introdução ao Java',
      capacity: 30,
      activityPlaceId: placeTwo.id,
      eventId: event.id,
      startsAt: dayjs().add(day, 'day').hour(hour + 1).toDate(),
      endsAt: dayjs().add(day, 'day').hour(hour + 2).toDate(),
    }
  });

  await prisma.activity.create({
    data:{
      title: 'Introdução ao Ts',
      capacity: 0,
      activityPlaceId: placeThree.id,
      eventId: event.id,
      startsAt: dayjs().add(day, 'day').hour(hour + 1).toDate(),
      endsAt: dayjs().add(day, 'day').hour(hour + 2).toDate(),
    }
  });

  day++

  await prisma.activity.create({
    data:{
      title: 'Introdução ao C#',
      capacity: 30,
      activityPlaceId: placeOne.id,
      eventId: event.id,
      startsAt: dayjs().add(day, 'day').hour(hour + 1).toDate(),
      endsAt: dayjs().add(day, 'day').hour(hour + 2).toDate(),
    }
  });

  await prisma.activity.create({
    data:{
      title: 'Introdução ao JavScript',
      capacity: 30,
      activityPlaceId: placeTwo.id,
      eventId: event.id,
      startsAt: dayjs().add(day, 'day').hour(hour + 1).toDate(),
      endsAt: dayjs().add(day, 'day').hour(hour + 2).toDate(),
    }
  });

  await prisma.activity.create({
    data:{
      title: 'Introdução ao Python',
      capacity: 0,
      activityPlaceId: placeThree.id,
      eventId: event.id,
      startsAt: dayjs().add(day, 'day').hour(hour + 1).toDate(),
      endsAt: dayjs().add(day, 'day').hour(hour + 2).toDate(),
    }
  });
  console.log('createActivities');
}

async function createTicketType() {
  let ticket = await prisma.ticket.findFirst()
  if(ticket) {
    await prisma.ticket.deleteMany({})
  }

  let ticketType = await prisma.ticketType.findFirst();

   if(ticketType) {
    await prisma.ticketType.deleteMany({});
   };

   await prisma.ticketType.create({
    data:{
      name: 'Online',
      price: 100,
      isRemote: true,
      includesHotel: false,
      createdAt: dayjs().toDate(),
    },
  });

   await prisma.ticketType.create({
    data:{
      name: 'Presencial Sem Hotel',
      price: 250,
      isRemote: false,
      includesHotel: false,
      createdAt: dayjs().toDate(),
    },
  });

   await prisma.ticketType.create({
    data:{
      name: 'Presencial Com Hotel',
      price: 600,
      isRemote: false,
      includesHotel: true,
      createdAt: dayjs().toDate(),
    },
  });
  console.log('createTicketType');
}

async function main() {
  await Promise.all([
    createEvent(),
    createHotels(),
    createActivity(),
    createTicketType(),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
