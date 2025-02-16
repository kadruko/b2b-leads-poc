import { Image } from '../image';
import { Product } from '../product';

export type ProductVariant = {
  id: string | null;
  image: Image | null;
  price: any | null;
  product: Product;
  sku: string | null;
  untranslatedTitle: string | null;

  // GraphQL only
  title?: string;
};
