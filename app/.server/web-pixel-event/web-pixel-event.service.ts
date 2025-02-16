import { EventName } from '../../.common/event/event.name';
import { cartViewedEventService } from './cart-viewed-event/cart-viewed-event.service';
import { checkoutAddressInfoSubmittedEventService } from './checkout-address-info-submitted-event/checkout-address-info-submitted-event.service';
import { checkoutCompletedEventService } from './checkout-completed-event/checkout-completed-event.service';
import { checkoutContactInfoSubmittedEventService } from './checkout-contact-info-submitted-event/checkout-contact-info-submitted-event.service';
import { checkoutShippingInfoSubmittedEventService } from './checkout-shipping-info-submitted-event/checkout-shipping-info-submitted-event.service';
import { checkoutStartedEventService } from './checkout-started-event/checkout-started-event.service';
import { collectionViewedEventService } from './collection-viewed-event/collection-viewed-event.service';
import { paymentInfoSubmittedEventService } from './payment-info-submitted-event/payment-info-submitted-event.service';
import { productAddedToCartEventService } from './product-added-to-cart-event/product-added-to-cart-event.service';
import { productRemovedFromCartEventService } from './product-removed-from-cart-event/product-removed-from-cart-event.service';
import { productViewedEventService } from './product-viewed-event/product-viewed-event.service';
import { searchSubmittedEventService } from './search-submitted-event/search-submitted-event.service';
import { WebPixelEventData } from './web-pixel-event.data';

export interface WebPixelEventService<T extends WebPixelEventData> {
  handleData(eventId: string, eventData: T): Promise<void>;
}

export const WEB_PIXEL_EVENT_SERVICE: Record<
  EventName,
  WebPixelEventService<WebPixelEventData> | undefined
> = {
  [EventName.ALERT_DISPLAYED]: undefined,
  [EventName.CART_VIEWED]: cartViewedEventService,
  [EventName.CHECKOUT_ADDRESS_INFO_SUBMITTED]:
    checkoutAddressInfoSubmittedEventService,
  [EventName.CHECKOUT_COMPLETED]: checkoutCompletedEventService,
  [EventName.CHECKOUT_CONTACT_INFO_SUBMITTED]:
    checkoutContactInfoSubmittedEventService,
  [EventName.CHECKOUT_SHIPPING_INFO_SUBMITTED]:
    checkoutShippingInfoSubmittedEventService,
  [EventName.CHECKOUT_STARTED]: checkoutStartedEventService,
  [EventName.COLLECTION_VIEWED]: collectionViewedEventService,
  [EventName.PAGE_VIEWED]: undefined,
  [EventName.PAYMENT_INFO_SUBMITTED]: paymentInfoSubmittedEventService,
  [EventName.PRODUCT_ADDED_TO_CART]: productAddedToCartEventService,
  [EventName.PRODUCT_REMOVED_FROM_CART]: productRemovedFromCartEventService,
  [EventName.PRODUCT_VIEWED]: productViewedEventService,
  [EventName.SEARCH_SUBMITTED]: searchSubmittedEventService,
  [EventName.UI_EXTENSION_ERRORED]: undefined,
};
