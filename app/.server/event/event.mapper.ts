import { CreateEvent } from '../../.common/event/event';
import { WebPixelEvent } from '../shopify/web-pixel-event';

class EventMapper {
  fromWebPixelEvent(
    shop: string,
    organizationId: string,
    { clientId, context, data, id, name, seq, timestamp, type }: WebPixelEvent,
  ): CreateEvent {
    const event: CreateEvent = {
      shop,
      organizationId,
      shopifyId: id,
      name,
      type,
      timestamp: new Date(timestamp),
      clientId,
      documentUrl: context.document.location.href,
      userLanguage: context.navigator.language,
      userAgent: context.navigator.userAgent,
    };
    return event;
  }
}

export const eventMapper = new EventMapper();
