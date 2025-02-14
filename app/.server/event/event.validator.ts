import {
  ALLOWED_EVENT_NAMES,
  ALLOWED_EVENT_TYPES,
} from '../../.common/event/event.constants';
import { EventName } from '../../.common/event/event.name';
import { EventType } from '../../.common/event/event.type';
import { WebPixelEvent } from '../shopify/web-pixel-event';

class EventValidator {
  validateWebPixelEvent({ type, name }: WebPixelEvent): void {
    if (!ALLOWED_EVENT_TYPES.includes(type as EventType)) {
      throw new Error('Invalid event type');
    }
    if (!ALLOWED_EVENT_NAMES.includes(name as EventName)) {
      throw new Error('Invalid event name');
    }
  }
}

export const eventValidator = new EventValidator();
