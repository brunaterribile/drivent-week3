import { TicketStatus } from '@prisma/client';
import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import hotelsRepository from '@/repositories/hotels-repository';

async function verifyTicketAndEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status == TicketStatus.RESERVED || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw paymentRequiredError();
  }
}

async function getHotels(userId: number) {
  await verifyTicketAndEnrollment(userId);

  const hotels = await hotelsRepository.getAllHotels();
  if (!hotels || hotels.length === 0) throw notFoundError();
  return hotels;
}

async function getHotelById(userId: number, hotelId: number) {
  await verifyTicketAndEnrollment(userId);

  const hotel = await hotelsRepository.getHotelById(hotelId);
  if (!hotel || hotel == undefined) throw notFoundError();
  return hotel;
}

const hotelsService = {
  getHotels,
  getHotelById,
};

export default hotelsService;
