import { CreateEventProduct } from '../../event/product/event-product';
import { eventProductService } from '../../event/product/event-product.service';
import { WebPixelEventService } from '../web-pixel-event.service';
import { CheckoutShippingInfoSubmittedEventData } from './checkout-shipping-info-submitted-event.data';

class CheckoutShippingInfoSubmittedEventService
  implements WebPixelEventService<CheckoutShippingInfoSubmittedEventData>
{
  async handleData(
    eventId: string,
    { checkout }: CheckoutShippingInfoSubmittedEventData,
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

export const checkoutShippingInfoSubmittedEventService =
  new CheckoutShippingInfoSubmittedEventService();
