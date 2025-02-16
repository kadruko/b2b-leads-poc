import { ProductVariant } from '../../.server/shopify/product-variant/product-variant';

export type Interest = {
  productVariantId: string;
  productVariant?: ProductVariant;
  interestScore: number;
};
