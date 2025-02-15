import { EventProduct } from '@prisma/client';

export type CreateEventProduct = Omit<EventProduct, 'id'>;
