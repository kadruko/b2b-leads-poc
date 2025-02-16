import { CheckoutLineItem } from './checkout-line-item';

export type Checkout = {
  attributes: any[];
  billingAddress: any[] | null;
  buyerAcceptsEmailMarketing?: boolean;
  buyerAcceptsSmsMarketing?: boolean;
  currecyCode: string | null;
  delivery?: any | null;
  discountApplications: any[];
  discountsAmount?: any | null;
  email: string | null;
  lineItems: CheckoutLineItem[];
  localization: any;
  order: any | null;
  phone: string | null;
  shippingAddress: any | null;
  shippingLine: any | null;
  smsMarketingPhone?: string | null;
  subtotalPrice: any | null;
  token: string | null;
  totalPrice: any | null;
  totalTax: any;
  transactions: any[];
};
