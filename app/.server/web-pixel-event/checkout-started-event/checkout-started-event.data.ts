import { Checkout } from '../../shopify/checkout';

export type CheckoutStartedEventData = {
  checkout: Checkout;
};
