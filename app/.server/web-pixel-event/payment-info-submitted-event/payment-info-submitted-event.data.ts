import { Checkout } from '../../shopify/checkout';

export type PaymentInfoSubmittedEventData = {
  checkout: Checkout;
};
