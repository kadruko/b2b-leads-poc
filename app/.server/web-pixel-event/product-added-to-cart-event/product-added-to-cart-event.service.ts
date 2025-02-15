import { CreateEventProduct } from '../../event/product/event-product';
import { eventProductService } from '../../event/product/event-product.service';
import { WebPixelEventService } from '../web-pixel-event.service';
import { ProductAddedToCartEventData } from './product-added-to-cart-event.data';

class ProductAddedToCartEventService
  implements WebPixelEventService<ProductAddedToCartEventData>
{
  async handleData(
    eventId: string,
    { cartLine }: ProductAddedToCartEventData,
  ): Promise<void> {
    if (!cartLine.merchandise?.id) {
      return;
    }

    const eventProduct: CreateEventProduct = {
      eventId,
      productVariantId: cartLine.merchandise.id,
    };
    await eventProductService.create(eventProduct);
  }
}

export const productAddedToCartEventService =
  new ProductAddedToCartEventService();
