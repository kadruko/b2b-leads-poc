import { CreateEventProduct } from '../../event/product/event-product';
import { eventProductService } from '../../event/product/event-product.service';
import { WebPixelEventService } from '../web-pixel-event.service';
import { CheckoutStartedEventData } from './checkout-started-event.data';

class CheckoutStartedEventService
  implements WebPixelEventService<CheckoutStartedEventData>
{
  async handleData(
    eventId: string,
    { checkout }: CheckoutStartedEventData,
  ): Promise<void> {
    for (const lineItem of checkout.lineItems) {
      if (!lineItem.variant?.id) {
        continue;
      }

      const eventProduct: CreateEventProduct = {
        eventId,
        productVariantId: lineItem.variant.id,
      };
      await eventProductService.create(eventProduct);
    }
  }
}

export const checkoutStartedEventService = new CheckoutStartedEventService();
