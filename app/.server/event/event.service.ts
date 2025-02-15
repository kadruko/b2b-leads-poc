import { Organization } from '@prisma/client';
import { AdminContext } from '@shopify/shopify-app-remix/server';
import { CreateEvent, EventListItem } from '../../.common/event/event';
import { EventProductListItem } from '../../.common/event/product/event-product';
import prisma from '../../db.server';
import { productVariantService } from '../shopify/product-variant/product-variant.service';
import { EventQuery } from './event.query';

class EventService {
  public async create(event: CreateEvent) {
    return await prisma.event.create({ data: event });
  }

  public async findMany(
    context: AdminContext,
    query: EventQuery,
  ): Promise<EventListItem[]> {
    const { organizationId, name } = this.filter(query);

    const events = await prisma.event.findMany({
      skip: query.offset,
      take: query.limit,
      where: {
        shop: context.session.shop,
        organizationId,
        name,
      },
      include: { organization: true, products: true },
      orderBy: { timestamp: query.sortOrder },
    });

    return this.enrich(context, events);
  }

  public async count(shop: string, query: EventQuery) {
    const { organizationId } = this.filter(query);

    return await prisma.event.count({
      where: { shop, organizationId },
    });
  }

  public async findOrganizations(shop: string): Promise<Organization[]> {
    const events = await prisma.event.findMany({
      distinct: ['organizationId'],
      include: { organization: true },
      where: { shop },
    });
    const organizations = events.map(({ organization }) => organization);
    return organizations;
  }

  private filter({ organizationIds, eventNames }: EventQuery) {
    let organizationId;
    if (organizationIds?.length || 0 > 0) {
      organizationId = {
        in: organizationIds,
      };
    }

    let name;
    if (eventNames?.length || 0 > 0) {
      name = {
        in: eventNames,
      };
    }

    return { organizationId, name };
  }

  private async enrich(
    context: AdminContext,
    events: EventListItem[],
  ): Promise<EventListItem[]> {
    const productVariantIds = events.flatMap(({ products }) =>
      products.map(({ productVariantId }) => productVariantId),
    );
    const productVariants = await productVariantService.findMany(
      context,
      productVariantIds,
    );
    events.forEach((event) => {
      (event.products as EventProductListItem[]).forEach((product) => {
        product.productVariant = productVariants.find(
          (variant) => variant.id === product.productVariantId,
        );
      });
    });
    return events;
  }
}

export const eventService = new EventService();
