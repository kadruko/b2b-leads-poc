import { Event, Organization } from '@prisma/client';
import { EventProductListItem } from './product/event-product';

export type CreateEvent = Omit<Event, 'id'>;

export type EventListItem = Event & {
  organization: Organization;
  products: EventProductListItem[];
};
