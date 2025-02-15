import { Product } from './product';

export type ProductVariant = {
  id: string | null;
  image: any | null;
  price: any | null;
  product: Product;
  sku: string | null;
  untranslatedTitle: string | null;
};
