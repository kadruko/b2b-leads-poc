import { CreateEventProduct } from '../../event/product/event-product';
import { eventProductService } from '../../event/product/event-product.service';
import { WebPixelEventService } from '../web-pixel-event.service';
import { CheckoutAddressInfoSubmittedEventData } from './checkout-address-info-submitted-event.data';

class CheckoutAddressInfoSubmittedEventService
  implements WebPixelEventService<CheckoutAddressInfoSubmittedEventData>
{
  async handleData(
    eventId: string,
    { checkout }: CheckoutAddressInfoSubmittedEventData,
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

export const checkoutAddressInfoSubmittedEventService =
  new CheckoutAddressInfoSubmittedEventService();
