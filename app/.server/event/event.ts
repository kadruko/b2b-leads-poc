import { Event } from '@prisma/client';

export type CreateEvent = Omit<Event, 'id'>;
