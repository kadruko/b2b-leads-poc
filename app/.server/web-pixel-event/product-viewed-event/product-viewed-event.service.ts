import { CreateEventProduct } from '../../event/product/event-product';
import { eventProductService } from '../../event/product/event-product.service';
import { WebPixelEventService } from '../web-pixel-event.service';
import { ProductViewedEventData } from './product-viewed-event.data';

class ProductViewedEventService
  implements WebPixelEventService<ProductViewedEventData>
{
  async handleData(
    eventId: string,
    eventData: ProductViewedEventData,
  ): Promise<void> {
    if (!eventData.productVariant?.id) {
      return;
    }

    const eventProduct: CreateEventProduct = {
      eventId,
      productVariantId: eventData.productVariant.id,
    };
    await eventProductService.create(eventProduct);
  }
}

export const productViewedEventService = new ProductViewedEventService();
