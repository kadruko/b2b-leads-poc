import prisma from '../../db.server';
import { CreateEvent } from './event';

class EventService {
  public async create(event: CreateEvent) {
    return await prisma.event.create({ data: event });
  }
}

export const eventService = new EventService();
