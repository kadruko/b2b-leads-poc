import { CreateEventProduct } from '../../event/product/event-product';
import { eventProductService } from '../../event/product/event-product.service';
import { WebPixelEventService } from '../web-pixel-event.service';
import { PaymentInfoSubmittedEventData } from './payment-info-submitted-event.data';

class PaymentInfoSubmittedEventService
  implements WebPixelEventService<PaymentInfoSubmittedEventData>
{
  async handleData(
    eventId: string,
    { checkout }: PaymentInfoSubmittedEventData,
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

export const paymentInfoSubmittedEventService =
  new PaymentInfoSubmittedEventService();
