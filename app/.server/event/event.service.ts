import prisma from '../../db.server';
import { CreateEvent } from './event';

class EventService {
  public async create(event: CreateEvent) {
    return await prisma.event.create({ data: event });
  }

  public async findMany(shop: string) {
    return await prisma.event.findMany({
      skip: 0,
      take: 10,
      where: { shop },
      include: { organization: true },
      orderBy: { timestamp: 'desc' },
    });
  }

  public async count(shop: string) {
    return await prisma.event.count({
      where: { shop },
    });
  }
}

export const eventService = new EventService();
