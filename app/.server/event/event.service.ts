import { CreateEvent } from '../../.common/event/event';
import prisma from '../../db.server';
import { EventQuery } from './event.query';

class EventService {
  public async create(event: CreateEvent) {
    return await prisma.event.create({ data: event });
  }

  public async findMany(shop: string, query: EventQuery) {
    return await prisma.event.findMany({
      skip: query.offset,
      take: query.limit,
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
