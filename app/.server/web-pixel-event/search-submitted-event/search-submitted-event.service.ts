import { CreateEventProduct } from '../../event/product/event-product';
import { eventProductService } from '../../event/product/event-product.service';
import { WebPixelEventService } from '../web-pixel-event.service';
import { SearchSubmittedEventData } from './search-submitted-event.data';

class SearchSubmittedEventService
  implements WebPixelEventService<SearchSubmittedEventData>
{
  async handleData(
    eventId: string,
    { searchResult }: SearchSubmittedEventData,
  ): Promise<void> {
    for (const productVariant of searchResult.productVariants) {
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

export const searchSubmittedEventService = new SearchSubmittedEventService();
