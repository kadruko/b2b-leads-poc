import { CreateEventProduct } from '../../event/product/event-product';
import { eventProductService } from '../../event/product/event-product.service';
import { WebPixelEventService } from '../web-pixel-event.service';
import { CheckoutCompletedEventData } from './checkout-completed-event.data';

class CheckoutCompletedEventService
  implements WebPixelEventService<CheckoutCompletedEventData>
{
  async handleData(
    eventId: string,
    { checkout }: CheckoutCompletedEventData,
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

export const checkoutCompletedEventService =
  new CheckoutCompletedEventService();
