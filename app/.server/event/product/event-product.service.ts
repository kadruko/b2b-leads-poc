import prisma from '../../../db.server';
import { CreateEventProduct } from './event-product';

class EventProductService {
  public async create(eventProduct: CreateEventProduct) {
    return await prisma.eventProduct.create({ data: eventProduct });
  }
}

export const eventProductService = new EventProductService();
