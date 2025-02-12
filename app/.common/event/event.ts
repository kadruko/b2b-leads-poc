import { Event, Organization } from '@prisma/client';

export type CreateEvent = Omit<Event, 'id'>;

export type EventListItem = Event & {
  organization: Organization;
};
