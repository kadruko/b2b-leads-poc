import { EventProduct } from '@prisma/client';
import { ProductVariant } from '../../../.server/shopify/product-variant/product-variant';

export type EventProductListItem = EventProduct & {
  productVariant?: ProductVariant;
};
