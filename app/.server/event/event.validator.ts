import { EventName } from '../../.common/event/event.name';
import { EventType } from '../../.common/event/event.type';
import { WebPixelEvent } from '../shopify/web-pixel-event';

class EventValidator {
  public static ALLOWED_EVENT_TYPES = [EventType.STANDARD];
  public static ALLOWED_EVENT_NAMES = [
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

  validateWebPixelEvent({ type, name }: WebPixelEvent): void {
    if (!EventValidator.ALLOWED_EVENT_TYPES.includes(type as EventType)) {
      throw new Error('Invalid event type');
    }
    if (!EventValidator.ALLOWED_EVENT_NAMES.includes(name as EventName)) {
      throw new Error('Invalid event name');
    }
  }
}

export const eventValidator = new EventValidator();
