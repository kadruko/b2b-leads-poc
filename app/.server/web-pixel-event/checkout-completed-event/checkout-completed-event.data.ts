import { Checkout } from '../../shopify/checkout';

export type CheckoutCompletedEventData = {
  checkout: Checkout;
};
