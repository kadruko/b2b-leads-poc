import { CreateEventProduct } from '../../event/product/event-product';
import { eventProductService } from '../../event/product/event-product.service';
import { WebPixelEventService } from '../web-pixel-event.service';
import { CartViewedEventData } from './cart-viewed-event.data';

class CartViewedEventService
  implements WebPixelEventService<CartViewedEventData>
{
  async handleData(
    eventId: string,
    { cart }: CartViewedEventData,
  ): Promise<void> {
    if (!cart) {
      return;
    }

    for (const cartLine of cart.lines) {
      if (!cartLine.merchandise.id) {
        continue;
      }

      const eventProduct: CreateEventProduct = {
        eventId,
        productVariantId: cartLine.merchandise.id,
      };
      await eventProductService.create(eventProduct);
    }
  }
}

export const cartViewedEventService = new CartViewedEventService();
