import { ProductVariant } from './product-variant/product-variant';

export type Collection = {
  id: string;
  productVariants: ProductVariant[];
  title: string;
};
