import { CartLine } from '../../shopify/cart-line';

export type ProductRemovedFromCartEventData = {
  cartLine: CartLine | null;
};
