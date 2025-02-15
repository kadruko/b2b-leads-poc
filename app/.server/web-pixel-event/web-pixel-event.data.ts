import { CartViewedEventData } from './cart-viewed-event/cart-viewed-event.data';
import { ProductAddedToCartEventData } from './product-added-to-cart-event/product-added-to-cart-event.data';
import { ProductRemovedFromCartEventData } from './product-removed-from-cart-event/product-removed-from-cart-event.data';
import { ProductViewedEventData } from './product-viewed-event/product-viewed-event.data';

export type WebPixelEventData =
  | CartViewedEventData
  | ProductViewedEventData
  | ProductAddedToCartEventData
  | ProductRemovedFromCartEventData;
