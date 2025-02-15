import { Cart } from '../../shopify/cart';

export type CartViewedEventData = {
  cart: Cart | null;
};
