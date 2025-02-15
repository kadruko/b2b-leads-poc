import { ProductVariant } from './product-variant';

export type CartLine = {
  cost: any;
  merchandise: ProductVariant;
  quantity: number;
};
