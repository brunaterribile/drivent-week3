import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const hotels = await hotelsService.getHotels(Number(userId));

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'PaymentRequired') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { hotelId } = req.params;

    const hotel = await hotelsService.getHotelById(Number(hotelId), Number(userId));
    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'PaymentRequired') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);

    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
