import { CartLine } from '../../shopify/cart-line';

export type ProductAddedToCartEventData = {
  cartLine: CartLine;
};
