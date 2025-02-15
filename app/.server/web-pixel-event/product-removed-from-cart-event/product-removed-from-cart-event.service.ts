import { CreateEventProduct } from '../../event/product/event-product';
import { eventProductService } from '../../event/product/event-product.service';
import { WebPixelEventService } from '../web-pixel-event.service';
import { ProductRemovedFromCartEventData } from './product-removed-from-cart-event.data';

class ProductRemovedFromCartEventService
  implements WebPixelEventService<ProductRemovedFromCartEventData>
{
  async handleData(
    eventId: string,
    { cartLine }: ProductRemovedFromCartEventData,
  ): Promise<void> {
    if (!cartLine?.merchandise.id) {
      return;
    }

    const eventProduct: CreateEventProduct = {
      eventId,
      productVariantId: cartLine.merchandise.id,
    };
    await eventProductService.create(eventProduct);
  }
}

export const productRemovedFromCartEventService =
  new ProductRemovedFromCartEventService();
