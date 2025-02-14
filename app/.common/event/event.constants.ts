import { SortOrder } from '../search.param';
import { EventName } from './event.name';
import { EventType } from './event.type';

export const EVENT_PAGE_SIZE = 10;
export const DEFAULT_EVENT_SORT_ORDER = SortOrder.DESC;

export const ALLOWED_EVENT_TYPES = [EventType.STANDARD];
export const ALLOWED_EVENT_NAMES = [
  EventName.CART_VIEWED,
  EventName.CHECKOUT_ADDRESS_INFO_SUBMITTED,
  EventName.CHECKOUT_COMPLETED,
  EventName.CHECKOUT_CONTACT_INFO_SUBMITTED,
  EventName.CHECKOUT_SHIPPING_INFO_SUBMITTED,
  EventName.CHECKOUT_STARTED,
  EventName.COLLECTION_VIEWED,
  EventName.PAGE_VIEWED,
  EventName.PAYMENT_INFO_SUBMITTED,
  EventName.PRODUCT_ADDED_TO_CART,
  EventName.PRODUCT_REMOVED_FROM_CART,
  EventName.PRODUCT_VIEWED,
  EventName.SEARCH_SUBMITTED,
];
