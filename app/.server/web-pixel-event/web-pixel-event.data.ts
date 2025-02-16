import { CartViewedEventData } from './cart-viewed-event/cart-viewed-event.data';
import { CheckoutAddressInfoSubmittedEventData } from './checkout-address-info-submitted-event/checkout-address-info-submitted-event.data';
import { CheckoutCompletedEventData } from './checkout-completed-event/checkout-completed-event.data';
import { CheckoutContactInfoSubmittedEventData } from './checkout-contact-info-submitted-event/checkout-contact-info-submitted-event.data';
import { CheckoutShippingInfoSubmittedEventData } from './checkout-shipping-info-submitted-event/checkout-shipping-info-submitted-event.data';
import { CheckoutStartedEventData } from './checkout-started-event/checkout-started-event.data';
import { CollectionViewedEventData } from './collection-viewed-event/collection-viewed-event.data';
import { PaymentInfoSubmittedEventData } from './payment-info-submitted-event/payment-info-submitted-event.data';
import { ProductAddedToCartEventData } from './product-added-to-cart-event/product-added-to-cart-event.data';
import { ProductRemovedFromCartEventData } from './product-removed-from-cart-event/product-removed-from-cart-event.data';
import { ProductViewedEventData } from './product-viewed-event/product-viewed-event.data';
import { SearchSubmittedEventData } from './search-submitted-event/search-submitted-event.data';

export type WebPixelEventData =
  | CartViewedEventData
  | CheckoutAddressInfoSubmittedEventData
  | CheckoutCompletedEventData
  | CheckoutContactInfoSubmittedEventData
  | CheckoutShippingInfoSubmittedEventData
  | CheckoutStartedEventData
  | CollectionViewedEventData
  | PaymentInfoSubmittedEventData
  | ProductAddedToCartEventData
  | ProductRemovedFromCartEventData
  | ProductViewedEventData
  | SearchSubmittedEventData;
