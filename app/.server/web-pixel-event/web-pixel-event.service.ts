import { EventName } from '../../.common/event/event.name';
import { productAddedToCartEventService } from './product-added-to-cart-event/product-added-to-cart-event.service';
import { productRemovedFromCartEventService } from './product-removed-from-cart-event/product-removed-from-cart-event.service';
import { productViewedEventService } from './product-viewed-event/product-viewed-event.service';
import { WebPixelEventData } from './web-pixel-event.data';

export interface WebPixelEventService<T extends WebPixelEventData> {
  handleData(eventId: string, eventData: T): Promise<void>;
}

export const WEB_PIXEL_EVENT_SERVICE: Record<
  EventName,
  WebPixelEventService<WebPixelEventData> | undefined
> = {
  [EventName.ALERT_DISPLAYED]: undefined,
  [EventName.CART_VIEWED]: undefined,
  [EventName.CHECKOUT_ADDRESS_INFO_SUBMITTED]: undefined,
  [EventName.CHECKOUT_COMPLETED]: undefined,
  [EventName.CHECKOUT_CONTACT_INFO_SUBMITTED]: undefined,
  [EventName.CHECKOUT_SHIPPING_INFO_SUBMITTED]: undefined,
  [EventName.CHECKOUT_STARTED]: undefined,
  [EventName.COLLECTION_VIEWED]: undefined,
  [EventName.PAGE_VIEWED]: undefined,
  [EventName.PAYMENT_INFO_SUBMITTED]: undefined,
  [EventName.PRODUCT_ADDED_TO_CART]: productAddedToCartEventService,
  [EventName.PRODUCT_REMOVED_FROM_CART]: productRemovedFromCartEventService,
  [EventName.PRODUCT_VIEWED]: productViewedEventService,
  [EventName.SEARCH_SUBMITTED]: undefined,
  [EventName.UI_EXTENSION_ERRORED]: undefined,
};
