import { ProductAddedToCartEventData } from './product-added-to-cart-event/product-added-to-cart-event.data';
import { ProductViewedEventData } from './product-viewed-event/product-viewed-event.data';

export type WebPixelEventData =
  | ProductViewedEventData
  | ProductAddedToCartEventData;
