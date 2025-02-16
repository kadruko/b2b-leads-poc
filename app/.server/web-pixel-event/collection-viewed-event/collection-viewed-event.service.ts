import { CreateEventProduct } from '../../event/product/event-product';
import { eventProductService } from '../../event/product/event-product.service';
import { WebPixelEventService } from '../web-pixel-event.service';
import { CollectionViewedEventData } from './collection-viewed-event.data';

class CollectionViewedEventService
  implements WebPixelEventService<CollectionViewedEventData>
{
  async handleData(
    eventId: string,
    { collection }: CollectionViewedEventData,
  ): Promise<void> {
    for (const productVariant of collection.productVariants) {
      if (!productVariant.id) {
        continue;
      }

      const eventProduct: CreateEventProduct = {
        eventId,
        productVariantId: productVariant.id,
      };
      await eventProductService.create(eventProduct);
    }
  }
}

export const collectionViewedEventService = new CollectionViewedEventService();
