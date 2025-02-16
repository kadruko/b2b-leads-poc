import { ProductVariant } from './product-variant/product-variant';

export type SearchResult = {
  productVariants: ProductVariant[];
  query: string;
};
