import { CreateEventProduct } from '../../event/product/event-product';
import { eventProductService } from '../../event/product/event-product.service';
import { WebPixelEventService } from '../web-pixel-event.service';
import { CheckoutContactInfoSubmittedEventData } from './checkout-contact-info-submitted-event.data';

class CheckoutContactInfoSubmittedEventService
  implements WebPixelEventService<CheckoutContactInfoSubmittedEventData>
{
  async handleData(
    eventId: string,
    { checkout }: CheckoutContactInfoSubmittedEventData,
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

export const checkoutContactInfoSubmittedEventService =
  new CheckoutContactInfoSubmittedEventService();
